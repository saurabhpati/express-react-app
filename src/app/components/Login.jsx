import React from "react";
import { connect } from "react-redux";

const Login = () => {
    return <div>
        <h2>
            Please Login.
        </h2>
        <form>
            <input type="text" placeholder="username" defaultValue="dev"></input>
            <input type="password" placeholder="password" defaultValue=""></input>
            <button htmlType="submit">Login</button>
        </form>
    </div>
};

export const ConnectedLogin = connect(state => state)(Login);