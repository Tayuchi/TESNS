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

        const imageUrl = response.data[0].url;
        if (!imageUrl) {
            throw new Error('No image URL found in the response');
        }

        console.log("Generated image URL:", imageUrl);
        return NextResponse.json({ imageUrl: imageUrl });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'An error occurred while processing your request' });
    }
}
export async function imageGenerate(prompt: string): Promise<string> {
    console.log("prompt", prompt);
    try {
        const response = await fetch('/api/dalle3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                str: prompt
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // サーバーからのレスポンスをJSONとしてパース
        return data.message;
    } catch (error) {
        console.error("エラーが発生しました:", error);
        throw new Error("API response processing failed.");
    }
}