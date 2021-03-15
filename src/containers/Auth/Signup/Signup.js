import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import Input from 'components/Input/Input';
import errorMap from 'utils/errorMap';
import fbService from 'api/fbService';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { AppContext } from 'context/AppContext';
import { actionTypes } from 'context/actionTypes';

import './Signup.scss';

const Signup = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const nameInputRef = useRef()
    const history = useHistory();
    const context = useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errorState, setErrorState] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
    })

    useEffect(() => {
        console.log("nameInputRef: ", nameInputRef.current)
        nameInputRef.current.focus();
    }, [])

    const changeHandler = (e) => { // name = 'email', value = 'a'
        setErrorState({
            emailError: '',
            passwordError: ''
        })
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async () => {
        try {
            setLoading(true);
            const user = await fbService.signup(credentials); // error
            console.log('Sucess: ', user);
            context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
            localStorage.setItem("user", JSON.stringify(user));
            history.push('/profile');
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
                name="name"
                value={credentials.name}
                onChange={changeHandler}
                placeholder="Enter name"
                className="app-auth-signup__input"
                loading={loading}
                inputRef={nameInputRef}
            />
            <ErrorMessage text={errorState.emailError} />
            <Input
                name="email"
                value={credentials.email}
                onChange={changeHandler}
                placeholder="Enter email"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError} />
            <Input
                name="password"
                value={credentials.password}
                onChange={changeHandler}
                placeholder="Enter password"
                className="app-auth-signup__input"
                loading={loading}
                type="password"
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
