import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';

import Input from 'components/Input/Input';
import errorMap from 'utils/errorMap';
import fbService from 'api/fbService';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { AppContext } from 'context/AppContext';
import { actionTypes } from 'context/contextTypes';

import './Signup.scss';

const Signup = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const context = useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const [errorState, setErrorState] = useState({
        emailError: '',
        passwordError: '',
    })

    const changeHandler = (name, value) => { // name = 'email', value = 'a'
        setErrorState({
            emailError: '',
            passwordError: ''
        })
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleSignup = async () => {
        try {
            setLoading(true);
            const user = await fbService.signup(credentials); // error
            console.log('Sucess: ', user);
            context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
        } catch (err) { // a, code, message
            setErrorState({
                emailError: err.code ? errorMap(err.code) : 'Signup Failed'
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app-auth-signup">
            <Input
                value={credentials.email}
                onChange={(e) => changeHandler('email', e.target.value)}
                placeholder="Enter email"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError} />
            <Input
                value={credentials.password}
                onChange={(e) => changeHandler('password', e.target.value)}
                placeholder="Enter password"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.passwordError} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSignup}
                disabled={loading}
            >SIGNUP</Button>
        </div>
    )
}

export default Signup;
