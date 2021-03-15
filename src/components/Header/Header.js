import React, { useContext } from 'react';
import Link from 'components/Link/Link';
import { AppContext } from 'context/AppContext';

import './Header.scss';

const headerLinks = [
    {
        title: 'Homepage',
        to: '/'
    },
    {
        title: 'Posts',
        to: '/posts'
    },
    {
        title: 'Todos',
        to: '/todos'
    }
]

const Header = () => {
    const context = useContext(AppContext);
    return (
        <div className="app-header">
            <nav>
                <ul>
                    {headerLinks.map(el => {
                        return (
                            <li key={el.title}><Link to={el.to}>{el.title}</Link></li>
                        )
                    })}
                    {
                        !context.state.user ? (
                            <li key='auth'><Link to='/auth'>Auth</Link></li>
                        ) : (
                                <li key='profile'><Link to='/profile'>Profile</Link></li>
                            )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;
