import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import * as mutations from "./mutations";
import axios from "axios";

const url = "http://localhost:5000"

export function* taskCreationSaga() {
    while (true) {
        const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
        const taskId = uuid();
        const ownerId = "U1";
        yield put(mutations.createTask(taskId, groupId, ownerId));
        yield axios.post(`${url}/tasks/new`, {
            task: {
                id: taskId,
                group: groupId,
                owner: ownerId,
                name: "New Task",
                isComplete: false,
            }
        });
    }
}

export function* taskModificationSaga() {
    while (true) {
        const { taskId, ...rest } = yield take([
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_COMPLETE]);
        yield axios.post(`${url}/tasks/update`, {
            task: { id: taskId, ...rest }
        });
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);

        try {
            const data = yield axios.post(`${url}/authenticate`, { username, password });
            // yield put(mutations.PROCESSING_AUTHENTICATE_USER);

            if (!data) {
                throw new Error("Username or password is incorrect.");
            }
        } catch (error) {
            console.log("Can't authenticate the user, ", error);
            yield put(mutations.processingAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}