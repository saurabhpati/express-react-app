import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { defaultState } from "../server/defaultState";
import * as sagas from "./saga";
import * as mutations from "./mutations";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        tasks(tasks = defaultState.tasks, action) {
            switch (action.type) {
                case mutations.CREATE_TASK:
                    return [...tasks, {
                        id: action.taskId,
                        name: "New Task",
                        group: action.groupId,
                        owner: action.ownerId,
                        isComplete: false
                    }];

                case mutations.SET_TASK_COMPLETE:
                    return tasks.reduce((acc, task) => {
                        let t;

                        if (task.id === action.taskId) {
                            t = { ...task, isComplete: action.isComplete };
                        } else {
                            t = { ...task };
                        }

                        acc.push(t);
                        return acc;
                    }, []);

                case mutations.SET_TASK_GROUP:
                    return tasks.reduce((acc, task) => {
                        let t;

                        if (task.id === action.taskId) {
                            t = { ...task, group: action.groupId };
                        } else {
                            t = { ...task };
                        }

                        acc.push(t);
                        return acc;
                    }, []);

                case mutations.SET_TASK_NAME:
                    return tasks.reduce((acc, task) => {
                        let t;

                        if (task.id === action.taskId) {
                            t = { ...task, name: action.name };
                        } else {
                            t = { ...task };
                        }

                        acc.push(t);
                        return acc;
                    }, []);

                default:
                    break;
            }

            return tasks;
        },
        groups(groups = defaultState.groups, action) {
            return groups;
        },
        comments(comments = defaultState.comments, action) {
            return comments;
        },
        users(users = defaultState.users, action) {
            return users;
        },
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}