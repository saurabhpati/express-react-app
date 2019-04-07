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