import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import Input from 'components/Input/Input';

import './Signup.scss';
import fbService from 'api/fbService';

const Signup = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
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

    const handleSignup = async () => {
        const user = await fbService.signup(credentials);
        console.log(user);
    }

    return (
        <div className="app-auth-signup">
            <Input
                value={credentials.email}
                onChange={(e) => changeHandler('email', e.target.value)}
                placeholder="Enter email"
                className="app-auth-signup__input"
            />
            <Input
                value={credentials.password}
                onChange={(e) => changeHandler('password', e.target.value)}
                placeholder="Enter password"
                className="app-auth-signup__input"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSignup}
            >SIGNUP</Button>
        </div>
    )
}

export default Signup;
