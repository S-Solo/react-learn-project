import React from 'react';
import Link from 'components/Link/Link';

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
    },
    {
        title: 'Auth',
        to: '/auth'
    },
]

const Header = () => {
    return (
        <div className="app-header">
            <nav>
                <ul>
                    {headerLinks.map(el => {
                        return (
                            <li key={el.title}><Link to={el.to}>{el.title}</Link></li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Header;
