import { AppContext } from 'context/AppContext';
import React, { useState, useContext, useEffect } from 'react';

import Login from './Login/Login';
import Signup from './Signup/Signup';

const Auth = ({ location }) => {
    const context = useContext(AppContext);
    const [isLogin, setIsLogin] = useState(false);

    const toggleView = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div>
            <h1>{isLogin ? 'LOGIN' : 'SIGNUP'}</h1>
            {isLogin ? (
                <Login />
            ) : <Signup />}
            <span onClick={toggleView}>{isLogin ? 'Go to Signup' : 'Go to Login'}</span>
        </div>
    )
}

export default Auth;
