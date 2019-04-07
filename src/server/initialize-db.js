import { connectDb } from "./connect-db";
import { defaultState } from "./defaultState";

async function initializeDb() {
    const db = await connectDb();
    const defaultUser = db.collection("users").findOne({id: "U1"});

    if (!defaultUser) {
        for (const collectionName in defaultState) {
            const collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName]);
        }
    }
}

initializeDb();