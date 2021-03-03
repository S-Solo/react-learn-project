import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import Input from 'components/Input/Input';
import fbService from 'api/fbService';

import './Login.scss';

const Login = () => {
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
