import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDb } from "./connect-db";
import { authenticate } from "./authenticate";

const app = express();
const port = process.env.port || 5000;

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

authenticate(app);

export const addNewTask = async task => {
    const db = await connectDb();
    const collection = db.collection('tasks');
    await collection.insertOne(task);
}

export const updateTask = async task => {
    const db = await connectDb();
    const collection = db.collection('tasks');
    const { id, ...rest } = task;
    console.log('These are rest of props', rest);
    await collection.updateOne({ id }, { $set: rest });
}

app.post('/tasks/new', async (req, res) => {
    console.log('tasks/new...');
    const task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});

app.post('/tasks/update', async (req, res) => {
    console.log('tasks/update...');
    const task = req.body.task;
    await updateTask(task);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});