import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
});

export async function POST(req: Request) {
    const { messages } = await req.json();
    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1000,
            temperature: 0,
            system: "あなたは人格者です。渡される投稿を丁寧な言葉に変換する必要があります。***絶対に変換した後の文章だけを出力します***",
            messages: [{
                role: "user",
                content: [{
                    type: "text",
                    text: "「" + messages + "」" + "という私のメッセージを適切な文章でかつ人格者風に話し言葉で変換したメッセージだけを出力してください。***なお変換した後の文章はSNSに載せられるのでSNSに載る前提で書いてください*** "
                }]
            }]
        });

        // 応答のテキスト内容を抽出
        const messageText = msg.content && msg.content[0] && msg.content[0].text;
        if (!messageText) {
            throw new Error('No valid text found in the response');
        }

        console.log("帰ってきたメッセージ:", messageText);
        return NextResponse.json({ message: messageText });
    } catch (err) {
        console.log('Error:');
    }
}
