import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
});

export async function POST(req: Request) {

    const { image1_media_type, image1_data } = await req.json();
    if (!(image1_media_type === "image/jpeg" || image1_media_type === "image/png")) {
        console.error('Unsupported image format');
        return NextResponse.json({ error: "Unsupported image format" });
    }
    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1000,
            temperature: 0,
            system: "You must list all elements about the image in English.",
            messages: [{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image1_media_type,
                            "data": image1_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": "Enumerate all elements of this image."
                    }
                ],
            }]
        });

        // 応答のテキスト内容を抽出
        const messageText = msg.content?.[0]?.text;
        if (!messageText) {
            throw new Error('No valid text found in the response');
        }

        console.log("帰ってきたメッセージ: ", messageText);
        return NextResponse.json({ message: messageText });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'An error occurred while processing your request' });
    }
}
