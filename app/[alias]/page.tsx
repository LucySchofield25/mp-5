import { redirect } from 'next/navigation';
import getCollection, { URLS_COLLECTION } from '@/lib/db';
import { Url } from '@/lib/model/Url';

export const dynamic = 'force-dynamic';

export default async function Page({params}: {params: Promise<{alias: string}>}) {
    const { alias } = await params;
    const collection = await getCollection<Url>(URLS_COLLECTION);
    const record = await collection.findOne({ alias });

    if (!record) {
        return <p className="text-red-600 text-center mt-10">Alias not found</p>;
    }

    redirect(record.url);
}
