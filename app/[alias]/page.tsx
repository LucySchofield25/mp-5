import { redirect } from 'next/navigation';
import getCollection, { URLS_COLLECTION } from '@/lib/db';
import { Url } from '@/lib/model/Url';

export default async function Page({ params }: { params: { alias: string } }) {
    const collection = await getCollection<Url>(URLS_COLLECTION);
    const record = await collection.findOne({ alias: params.alias });

    if (!record) {
        return <p>Alias not found</p>;
    }

    redirect(record.url);
}
