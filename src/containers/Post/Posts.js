import React, { Component } from 'react';

import Post from 'components/Post/Post';
import service from 'api/service';


import './Posts.scss';

export class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        service.getPosts(0, 20)
            .then(data => {
                this.setState({
                    posts: data
                })
            })
            .catch(err => {

            })
        
    }

    updatePost = () => {
        service.updatePost(5, { title: 'Another Title' })
            .then(data => {
                const newPosts = this.state.posts.map(el => {
                    if (el.id === data.id) {
                        return data;
                    }
                    return el;
                })

                this.setState({
                    posts: newPosts
                })
            })
    }

    createPost = () => {
        service.createPost({
            title: 'Awesome Title',
            body: 'Nice body',
            userId: 1
        })
            .then(data => {
                this.setState({
                    posts: [...this.state.posts, data]
                })
            })
    }

    render() {
        return (
            <div className="app-posts">
                {
                    this.state.posts.map(post =>
                        <Post
                            key={post.id}
                            post={post}
                            className="app-posts__post"
                        />
                    )
                }
                <button onClick={this.createPost}>Create Post</button>
                <button onClick={this.updatePost}>Update Post</button>
            </div>
        )
    }
}

export default Posts
