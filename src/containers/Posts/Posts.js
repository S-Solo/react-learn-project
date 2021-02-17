import React, { Component } from 'react';

import Post from 'components/Post/Post';
import service from 'api/service';

import './Posts.scss';

const limit = 9;

export class Posts extends Component {
    state = {
        posts: null,
        start: 0,
        hasMore: true,
        loading: false,
    }

    componentDidMount() {
        service.getPosts(this.state.start) // 0, 9
            .then(data => { // []
                this.setState({
                    posts: data,
                })
            })
    }

    updatePost = (id) => {
        service.updatePost(5, { title: 'Another Title' })
            .then(data => { // {id, title, ...}
                const newPosts = this.state.posts.map(el => {
                    if (el.id === id) { //data.id
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

    deletePost = (id) => {
        service.deletePost(id)
            .then(() => { // {}
                this.setState({
                    posts: this.state.posts.filter((el) => { // 1, 2, 3, 4, 5
                        return el.id !== id; // false
                    })
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getMore = () => {
        const newStart = this.state.start + limit; /// syncron
        this.setState({
            start: newStart,
            loading: true // 9, 9   18, 9,  27, 9
        })
        service.getPosts(newStart)
            .then(data => {
                this.setState({
                    posts: [...this.state.posts, ...data],
                    hasMore: data.length < limit ? false : true, // 1 < 9 
                    loading: false
                })
            }) // 3s
    }

    render() {
        const { loading, hasMore, posts } = this.state;

        if (!posts) {
            return <div>Loading...</div>
        }

        return (
            <div className="app-posts">
                {posts.length > 0 ? (
                    <>
                        <div className="app-posts__container">
                            {
                                posts.map(post => // []
                                    <Post
                                        key={post.id}
                                        post={post}
                                        className="app-posts__container__post"
                                    />
                                )
                            }
                        </div>
                        {hasMore && <button onClick={this.getMore} disabled={loading}>{loading ? 'Loading...' : 'Get More'}</button>}
                    </>
                ) : (
                        <div>No results</div>
                    )}
            </div>
        )
    }
}

export default Posts
