import { useEffect, useRef, useState } from 'react'
import { ANSWER, EXAMPLES } from './Data'
import perfil from '../Assets/perfil.jpeg'

const apiKey = import.meta.env.VITE_API_KEY
type Message = {
  id: string;
  type: "bot" | "user";
  text: React.ReactNode;
}

function Chat() {
  const [loading, setLoading] = useState<boolean>(false)
  const [question, setQuestion] = useState<string>("")
  const [message, setMessage] = useState<Message[]>([{
    id: "1",
    type: "bot",
    text: "hola, soy un bot de Ailen Presta, estoy aqui para contestar tus preguntas"
  }])
  const ref = useRef<HTMLDivElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage((message) => message.concat({
      id: String(Date.now()),
      type: "user",
      text: question
    }))
    setQuestion("");

    const { classifications } = await fetch("https://api.cohere.ai/v1/classify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "large",
        inputs: [question],
        examples: EXAMPLES
      })
    }).then(res => res.json());


    setMessage((message) => message.concat({
      id: String(Date.now()),
      type: "bot",
      text: ANSWER[classifications[0].prediction as keyof typeof ANSWER]
    }))
    setLoading(false)
  }

  useEffect(() =>{
    ref.current?.scrollTo(0, ref.current.scrollHeight)
  },[message])

  return (
    <div className='flex flex-col gap-4 border-2 border-black rounded-md max-w-xl mx-auto my-8 bg-[#ECC05F]'>
      <div className='flex flex-row bg-black p-2'>
        <img className='my-auto w-10 h-10 rounded-3xl' src={perfil} alt="foto de Ailen" />
        <h1 className='my-auto px-3 font-bold'>Ailen Presta</h1>
      </div>
      <div ref={ref} className='flex p-4 flex-col gap-4 overflow-y-auto h-[400px]'>
        {message.map((item) => (
          <div key={item.id} className={`text-white p-4 max-w-[80%] rounded-2xl ${item.type === 'bot'
            ? 'bg-[#B81644] text-left self-start rounded-bl-none'
            : 'bg-[#115653] text-left self-end rounded-br-none'}`}>{item.text}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='flex items-center rounded-md p-4'>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          name='question'
          type='text'
          className='flex-1 rounded-l-lg bg-black px-5 py-1 focus:outline-none' />
        <button disabled={loading} className={`px-5 py-1 rounded-r-lg ${loading ? "bg-zinc-500" : "bg-[#115653]"}`}>↑</button>
      </form>
    </div>
  )
}

export default Chat