import OpenAI from "openai"
import { NextResponse } from 'next/server'
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });


export async function POST(req: Request) {
    const { str } = await req.json();

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: str,
            n: 1,
            size: "1024x1024"
        });

        if (!response.data) {
            throw new Error('No data returned from the API');
        }

        const dalle3Url = response.data[0].url;
        if (!dalle3Url) {
            throw new Error('No image URL found in the response');
        }

        console.log("Generated image URL:", dalle3Url);
        return NextResponse.json({ dalle3Url: dalle3Url });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'An error occurred while processing your request' });
    }
}
