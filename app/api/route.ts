import { NextResponse } from 'next/server';
import getCollection, { URLS_COLLECTION } from '@/lib/db';
import { Url } from '@/lib/model/Url';

export async function POST(req: Request) {
    try {
        const { alias, url } = await req.json();

        new URL(url);
        const res = await fetch(url, { method: 'HEAD' });
        if (!res.ok || res.status !== 200) {
            return NextResponse.json({ error: 'URL is not reachable/ returned non-200 status' }, { status: 400 });
        }
        const collection = await getCollection<Url>(URLS_COLLECTION);

        const existing = await collection.findOne({ alias });
        if (existing) {
            return NextResponse.json({ error: 'Alias already exists' }, { status: 409 });
        }

        await collection.insertOne({ alias, url, createdAt: new Date() });

        return NextResponse.json({ message: 'Short URL created' }, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Invalid or unreachable URL' }, { status: 400 });
    }
}
