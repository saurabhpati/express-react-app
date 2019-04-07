import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017/organizer"
let db = null;

export async function connectDb() {
    if (db) {
        return db;
    }

    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db();
    console.info("Got Db", db);
    return db;
}

//connectDb();