import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = () => (
    <Link to="/dashboard">
        <h2>Application</h2>
    </Link>
);

export const ConnectedNavigation = connect(state => state)(Navigation);