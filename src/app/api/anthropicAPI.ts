// anthropicAPI.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"]
});

export async function sendMessageToAnthropic(messageText: string) {
    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240229",
        max_tokens: 1000,
        temperature: 0,
        messages: [{
            role: "user",
            content: [{
                type: "text",
                text: "「" + messageText + "」" + "のメッセージを人格者風に変換してください。"
            }]
        }]
    });
    console.log("帰ってきたメッセージ:" + msg);
}
