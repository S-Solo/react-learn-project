import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import Input from 'components/Input/Input';
import fbService from 'api/fbService';
import { actionTypes } from 'context/actionTypes';
import { AppContext } from 'context/AppContext';

import './Login.scss';

const Login = () => {
    const history = useHistory();
    const context = useContext(AppContext);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const changeHandler = (name, value) => { // name = 'email', value = 'a'
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const loginHandler = async () => {
        const user = await fbService.login(credentials);
        context.dispatch({ type: actionTypes.SET_USER, payload: { user } })
        localStorage.setItem("user", JSON.stringify(user));
        history.push('/profile');
        console.log(user);
    }

    return (
        <div className="app-auth-login">
            <Input
                value={credentials.email}
                onChange={(e) => changeHandler('email', e.target.value)}
                placeholder="Enter email"
                className="app-auth-login__input"
            />
            <Input
                value={credentials.password}
                onChange={(e) => changeHandler('password', e.target.value)}
                placeholder="Enter password"
                className="app-auth-login__input"
                type="password"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={loginHandler}
            >Login</Button>
        </div>
    )
}

export default Login;
