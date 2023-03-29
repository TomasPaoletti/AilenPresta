import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Chat from "./Chat";
import { EXAMPLES } from './Data'

describe("<Chat />", () => {
    let component: any;
    beforeEach(() => {
        component = render(<Chat />);
    });

    test('render component', () => {
        const { getByText } = component;
        getByText("Ailen Presta");
    });

    test('handleSubmit', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockRejectedValue({ classifications: [] })
        });

        global.fetch = mockFetch;

        const { getByTestId, getByPlaceholderText } = component
        const apikey= import.meta.env.VITE_API_KEY
        const question = ''

        const input = getByPlaceholderText('Escribe tu pregunta');
        fireEvent.change(input, { target: { value: question } })

        const form = getByTestId('form')
        fireEvent.submit(form)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.cohere.ai/v1/classify', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apikey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mode: 'large',
                    inputs: [question],
                    examples: EXAMPLES
                })
            })
        });


    })

    test('onChange input', () => {
        const { getByPlaceholderText } = component;
        const input = getByPlaceholderText('Escribe tu pregunta');

        fireEvent.change(input, { target: { value: 'Question' } })

        expect(input).toHaveValue('Question');
    })
})