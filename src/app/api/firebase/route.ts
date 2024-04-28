import { storage, } from "@/libs/components/firebase/firebase";
import { NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
export async function POST(req: Request) {
    const { imageUrl } = await req.json();
    if (!imageUrl.startsWith('https://oaidalleapiprodscus.blob.core.windows.net')) {
        throw new Error('Invalid URL');
    }
    try {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageRef = ref(storage, `images/${Date.now()}.png`);
        const snapshot = await uploadBytes(imageRef, buffer);
        const permanentUrl = await getDownloadURL(snapshot.ref);

        console.log("savedUrl:", permanentUrl);
        return NextResponse.json({ savedUrl: permanentUrl });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'An error occurred while processing your request' });
    }
}
