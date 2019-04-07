import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import * as mutations from "./mutations";

export function* taskCreationSaga() {
    while (true) {
        const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
        console.log("Got group Id", groupId);
        const taskId = uuid();
        const ownerId = "U1";
        yield put(mutations.createTask(taskId, groupId, ownerId));
    }
}