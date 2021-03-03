import React, { useState } from 'react';

import Login from './Login/Login';
import Signup from './Signup/Signup';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

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
