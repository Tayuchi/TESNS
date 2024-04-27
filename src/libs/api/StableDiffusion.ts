import type { NextApiRequest, NextApiResponse } from 'next';
/*
import fetch from 'node-fetch';
import fs from 'fs'; // 正しくfsをインポート

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const engineId = 'stable-diffusion-xl-1024-v1-0';
    const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing Stability API key.' });
    }

    const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [{ text: 'A lighthouse on a cliff' }],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                steps: 30,
                samples: 1,
            }),
        }
    );

    if (!response.ok) {
        return res.status(response.status).json({ error: await response.text() });
    }

    const responseJSON = (await response.json()) as {
        artifacts: Array<{ base64: string; seed: number; finishReason: string }>;
    };

    responseJSON.artifacts.forEach((image, index) => {
        
       fs.writeFileSync(
            `./public/images/v1_txt2img_${index}.png`,
            Buffer.from(image.base64, 'base64')
        );
    
    });

    res.status(200).json({ message: 'Images generated successfully.' });
}
*/