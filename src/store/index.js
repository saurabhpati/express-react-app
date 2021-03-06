import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { defaultState } from "../server/defaultState";
import * as sagas from "./saga";
import * as mutations from "./mutations";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        session(userSession = defaultState.session, action) {
            const { type, authenticated } = action;

            switch (type) {
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return { ...userSession, authenticated: mutations.AUTHENTICATING };

                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return { ...userSession, authenticated };

                case mutations.SET_STATE:
                    return { ...userSession, id: action.state.session.id, authenticated: action.state.session.authenticated };

                default:
                    return userSession;
            }

        },
        tasks(tasks = [], action) {
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

                case mutations.SET_STATE:
                    return [...action.state.tasks];

                default:
                    break;
            }

            return tasks;
        },
        groups(groups = [], action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return [...action.state.groups];

                default:
                    return groups;
            }
        },
        comments(comments = [], action) {
            return comments;
        },
        users(users = [], action) {
            return users;
        },
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}