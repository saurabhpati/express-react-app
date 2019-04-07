import { connectDb } from "./connect-db";
import { defaultState } from "./defaultState";

async function initializeDb() {
    const db = await connectDb();
    
    for (const collectionName in defaultState) {
        const collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
    }
}

initializeDb();