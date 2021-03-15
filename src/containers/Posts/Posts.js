import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';

import { Button } from "@material-ui/core";

import Post from 'components/Post/Post';
import service from 'api/service';
import fbService from 'api/fbService';
import { AppContext } from 'context/AppContext';
import { actionTypes } from 'context/actionTypes';
import PostModal from "components/PostModal/PostModal";

import './Posts.scss';
import { reduxActionTypes } from 'reducers/reduxActionTypes';

export const PostsContext = createContext({
    posts: null
})

const limit = 8;
export class Posts extends Component {
    state = {
        startAt: 0,
        hasMore: true,
        loading: false,
        isCreatePopupOpen: false,
        titleValue: '',
        bodyValue: '',
    }

    static contextType = AppContext

    componentDidMount() {
        if (!this.props.posts) {
            fbService.getPosts(this.state.startAt, limit) // 0, 9
                .then(data => { // []
                    // this.context.dispatch({ type: actionTypes.SET_POSTS, payload: { posts: data } })
                    this.props.setReduxPosts(data);
                })
        }
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
        const newPost = {
            title: this.state.titleValue,
            body: this.state.bodyValue,
            userId: 1,
        }
        fbService.createPost(newPost)
            .then(data => {
                this.context.dispatch({
                    type: actionTypes.CREATE_POST,
                    payload: { post: data }
                })
                this.toggleCreateModal();
            })
    }

    deletePost = (id) => {
        fbService.deletePost(id)
            .then(() => { // {}
                fbService.getPosts(this.state.startAt, this.state.posts)
                    .then(res => {

                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getMore = () => {
        const newstartAt = this.state.startAt + limit + 1; // 0, 9, 18
        this.setState({
            startAt: newstartAt,
            loading: true
        })
        fbService.getPosts(newstartAt, newstartAt + limit)
            .then(data => { // [{.psot1, ...}]
                console.log('data: ', data);
                // this.context.dispatch({ type: actionTypes.GET_MORE_POSTS, payload: { posts: data } })
                this.props.getReduxPosts(data);
                this.setState({
                    hasMore: data.length < limit ? false : true, // 1 < 9 
                    loading: false
                })
            }) // 3s
    }

    toggleCreateModal = () => {
        this.setState(prev => ({ isCreatePopupOpen: !prev.isCreatePopupOpen }));
    }

    changeValue = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        console.log("this.props: ", this.props)
        const { loading, hasMore, isCreatePopupOpen, titleValue, bodyValue } = this.state;
        // const { state: { posts } } = this.context;
        const { posts } = this.props;

        if (!posts) {
            return <div>Loading...</div>
        }

        return (
            <div className={`app-posts`}>
                {posts.length > 0 ? (
                    <>
                        <div className="app-posts__container">
                            {
                                posts.map(post => // []
                                    <Post
                                        key={post.id}
                                        post={post}
                                        className="app-posts__container__post"
                                        isLink
                                        remove={() => this.deletePost(post.id)}
                                    />
                                )
                            }
                        </div>
                        <Button onClick={this.toggleCreateModal}>Create Post</Button>
                        {hasMore && <button onClick={this.getMore} disabled={loading}>{loading ? 'Loading...' : 'Get More'}</button>}
                    </>
                ) : (
                        <div>No results</div>
                    )}

                <PostModal
                    action={this.createPost}
                    bodyValue={bodyValue}
                    titleValue={titleValue}
                    changeValue={this.changeValue}
                    isOpen={isCreatePopupOpen}
                    onClose={this.toggleCreateModal}
                    buttonTitle="Create"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        count: state.count
    }
}

const mapDispatchToProps = {
    setReduxPosts: (posts) => ({
        type: reduxActionTypes.SET_POSTS,
        payload: {
            posts,
        }
    }),
    getReduxPosts: (posts) => ({
        type: reduxActionTypes.SET_POSTS,
        payload: {
            posts,
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
