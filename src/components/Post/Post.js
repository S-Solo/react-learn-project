import React from "react";
import PropType from "prop-types";
import { Button } from "@material-ui/core";
import Link from "components/Link/Link";

import "./Post.scss";

const Post = ({
    post,
    onClick = () => { },
    isLink = false,
    className = '',
    edit = () => { },
    remove = () => { }
}) => {

    const removeHandler = (e) => {
        e.preventDefault();
        remove();
    }

    const Wrapper = ({ children }) => {
        const containerClassName = `app-post ${className}`;
        return isLink ? (
            <>
                <Link to={`/posts/${post.id}`} className={containerClassName}>
                    <Button onClick={removeHandler} >
                        Remove
                    </Button>
                    {children}
                </Link>
            </>
        ) : (
                <div className={containerClassName}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={edit}
                    >Update</Button>
                    {children}
                </div>
            );
    };

    return (
        <Wrapper>
            <p className="app-post__title">{post?.title}</p>
            <p className="app-post__body">{post?.body}</p>
        </Wrapper>
    );
};

Post.propType = {
    post: PropType.shape({
        title: PropType.string.isRequired,
        body: PropType.string.isRequired,
        id: PropType.number,
    }),
    onclick: PropType.func,
    isLink: PropType.bool,
    className: PropType.string,
    edit: PropType.func,
    remove: PropType.func
};

export default Post;