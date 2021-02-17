import React from 'react';
import PropTypes from 'prop-types';

import './Post.scss';
import Link from 'components/Link/Link';

const Post = ({ post, className = "" }) => {
    return (
        <Link to={`/posts/${post.id}`}>
            <div className={`app-post ${className}`}>
                <span className="app-post__title">{post.title}</span>
                <span className="app-post__body">{post.body}</span>
            </div>
        </Link>
    )
}

Post.propTypes = {
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
}


export default Post;
