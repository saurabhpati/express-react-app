import md5 from "md5";
import uuid from "uuid";
import { connectDb } from "./connect-db";

const authenticationTokens = [];

const assembleUserState = async (user) => {
    const db = await connectDb();
    const tasks = await db.collection("tasks").find({ owner: user.id }).toArray();
    const groups = await db.collection("groups").find({ owner: user.id }).toArray();

    return {
        tasks,
        groups,
        session: {
            authenticated: "AUTHENTICATED", id: user.id
        }
    }
}

export const authenticate = (app) => {
    app.post('/authenticate', async (req, res) => {
        const { username, password } = req.body;
        console.log({ username, password });
        const db = await connectDb();
        const user = await db.collection("users").findOne({ name: username });

        if (!user) {
            res.status(500).send("User does not exist");
        }
        console.log(user);
        const hash = md5(password);

        console.log("hash", hash);
        console.log("password Hash", user.passwordHash);
        if (hash !== user.passwordHash) {
            res.status(500).send("Password incorrect");
        }

        const token = uuid();
        authenticationTokens.push({
            token,
            userId: user.id
        });

        const state = await assembleUserState(user);

        res.send({ token, state });
    });
}