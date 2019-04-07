import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setTaskComplete, setTaskGroup, setTaskName } from "../../store/mutations";

const TaskDetail = ({ id, task, comments, isComplete, groups, setTaskCompletion, setTaskGroup, setTaskName }) => (
    <div>
        <div>
            <input onChange={setTaskName} value={task.name}></input>
        </div>
        <div>
            <button onClick={e => setTaskCompletion(!task.isComplete)}>{isComplete ? "Reopen" : "Complete"}</button>
        </div>
        <div>
            <select value={task.group} onChange={setTaskGroup}>
                {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
        </div>
        <div>
            <Link to="/dashboard">
                <button>Done</button>
            </Link>
        </div>
    </div>
);

export const ConnectedTaskDetail = connect((state, { match }) => {
    const task = state.tasks.find(t => t.id === match.params.id);
    const { id, isComplete } = task;

    return {
        id,
        task: state.tasks.find(t => t.id === id),
        comments: state.comments,
        isComplete,
        groups: state.groups,
    }
}, (dispatch, { match: { params: { id } } }) => ({
    setTaskCompletion(isComplete) {
        dispatch(setTaskComplete(id, isComplete));
    },
    setTaskGroup(e) {
        dispatch(setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
        dispatch(setTaskName(id, e.target.value));
    }
}))(TaskDetail);