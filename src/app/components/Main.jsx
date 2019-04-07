import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { history } from "../../store/history";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route } from "react-router-dom";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetail";

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                <Route
                    exact
                    path="/dashboard"
                    render={() => (<ConnectedDashboard />)}>
                </Route>
                <Route
                    exact
                    path="/task/:id"
                    render={({ match }) => (<ConnectedTaskDetail match={match} />)}>
                </Route>
            </div>
        </Provider>
    </Router>
);
