
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"]
});

export async function POST(req: Request) {
    const { messages } = await req.json()
    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        temperature: 0,
        messages: [{
            role: "user",
            content: [{
                type: "text",
                text: messages
            }]
        }]
    }).catch(async (err) => {
        if (err instanceof Anthropic.APIError) {
            console.log(err.status); // 400
            console.log(err.name); // BadRequestError
            console.log(err.headers); // {server: 'nginx', ...}
        } else {
            throw err;
        }
    });
    console.log("帰ってきたメッセージ:" + msg);
    return Response.json({ msg })
}