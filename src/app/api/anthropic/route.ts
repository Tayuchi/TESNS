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
            messages: [{
                role: "user",
                content: [{
                    type: "text",
                    text: "「" + messages + "」" + "という不適切なメッセージを適切な文章でかつ人格者風に変換したメッセージを出力してください。 *注意* あくまで「」内のメッセージは変換元のメッセージです。あなたが出力する文章は不適切な内容の文章であれば、丁寧な適切な文章にして出力してください。 ***絶対に変換した後の文章だけを出力してください！！！***"
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