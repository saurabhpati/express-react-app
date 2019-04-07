import React from "react";
import { Provider } from "react-redux";
import { Redirect } from "react-router";
import { Router, Route } from "react-router-dom";
import { store } from "../../store";
import { history } from "../../store/history";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetail";
import { ConnectedLogin } from "./Login";

const RouteGuard = Component => ({ match }) => {
    if (store.getState().session.authenticated) {
        return <Component match={match}></Component>
    } else {
        return <Redirect to="/"></Redirect>
    }

}

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                <Route
                    exact
                    path="/"
                    component={ConnectedLogin}>
                </Route>
                <Route
                    exact
                    path="/dashboard"
                    render={RouteGuard(ConnectedDashboard)}>
                </Route>
                <Route
                    exact
                    path="/task/:id"
                    render={RouteGuard(ConnectedTaskDetail)}>
                </Route>
            </div>
        </Provider>
    </Router>
);
