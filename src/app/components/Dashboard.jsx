import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";

const Dashboard = ({ groups }) => (
    <div>
        <h2>Dashboard</h2>
        {groups.map(group => <ConnectedTaskList key={group.id} id={group.id} name={group.name}></ConnectedTaskList>)}
    </div>
);

export const ConnectedDashboard = connect(state => ({ groups: state.groups }))(Dashboard);