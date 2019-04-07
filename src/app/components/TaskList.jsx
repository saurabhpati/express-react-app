import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestTaskCreation } from "../../store/mutations";

const TaskList = ({ id, name, tasks, createNewTask }) => (
    <div>
        <h3>{name}</h3>
        <div>
            {tasks.map(task =>
                <Link key={task.id} to={`task/${task.id}`}>
                    <div >{task.name}</div>
                </Link>
            )}
        </div>
        <button onClick={() => createNewTask(id)}>Add Task</button>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.id,
    name: ownProps.name,
    tasks: state.tasks.filter(task => task.group === ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    createNewTask(id) {
        console.log("creating a new task...", id);
        dispatch(requestTaskCreation(id));
    }
});

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);
