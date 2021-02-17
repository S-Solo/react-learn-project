import React from 'react';
import Link from 'components/Link/Link';

import './Header.scss';

const Header = () => {
    return (
        <div className="app-header">
            <nav>
                <ul>
                    <li><Link to="/">homepage</Link></li>
                    <li><Link to="/posts">posts</Link></li>
                    <li><Link to="/todos">todos</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;
