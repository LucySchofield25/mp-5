import { MongoClient, Db, Collection, Document } from "mongodb";
const MONGO_URI = process.env.MONGODB_URI as string;
if (!MONGO_URI) {
    throw new Error("MONGODB_URI environment variable is missing");
}

const DB_NAME = "cs391mp-5"
export const URLS_COLLECTION = "urls"
let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client= new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME)
}

export default async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
    if (!db){
        db = await connect();
    }
    return db.collection<T>(collectionName);
}
