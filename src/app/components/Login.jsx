import React from "react";
import { connect } from "react-redux";
import { requestAuthenticateUser, NOT_AUTHENTICATED, AUTHENTICATING, AUTHENTICATED } from "../../store/mutations";

const Login = ({ authenticated, authenticate }) => {
    return <div>
        <h2>
            Please Login.
        </h2>
        <form onSubmit={authenticate}>
            <input type="text" placeholder="username" defaultValue="Dev" name="username"></input>
            <input type="password" placeholder="password" defaultValue="" name="password"></input>
            <button type="submit">Login</button>
        </form>
        {authenticated === NOT_AUTHENTICATED
            ? <p>Cannot login, please try again!</p>
            : authenticated === AUTHENTICATING
                ? <p>Authenticating... Please wait!</p>
                : authenticated === AUTHENTICATED 
                    ? <p>Login Successfull!</p> 
                    : null}
    </div>
};

export const ConnectedLogin = connect(({ session: { authenticated } }) => ({authenticated}), (dispatch) => ({
    authenticate(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        dispatch(requestAuthenticateUser(username, password));
    }
}))(Login);