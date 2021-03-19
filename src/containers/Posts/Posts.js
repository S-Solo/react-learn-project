import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';

import { Button } from "@material-ui/core";

import Post from 'components/Post/Post';
import service from 'api/service';
import fbService from 'api/fbService';
import { AppContext } from 'context/AppContext';
import PostModal from "components/PostModal/PostModal";

import { getReduxPosts, setPostsHasMore, setReduxPosts } from 'actions/postActions';

import './Posts.scss';

export const PostsContext = createContext({
    posts: null
})

const limit = 8;
export class Posts extends Component {
    state = {
        startAt: this.props.posts ? this.props.posts.length : 0,
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
                this.toggleCreateModal();
                if (!this.props.postsHasMore) {

                }
                this.props.history.push(`/posts/${data.id}`);
            })
    }

    deletePost = (id) => {
        const { startAt } = this.state;
        fbService.deletePost(id)
            .then(() => { // {}
                fbService.getPosts(0, startAt !== 0 ? startAt + limit : limit) // 0 - 9 
                    .then(res => {
                        this.props.setReduxPosts(res);
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
                this.props.setPostsHasMore(data.length < limit ? false : true)
                this.props.getReduxPosts(data);
                this.setState({
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
        const { loading, isCreatePopupOpen, titleValue, bodyValue } = this.state;
        // const { state: { posts } } = this.context;
        const { posts, postsHasMore } = this.props;

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
                        {postsHasMore && <button onClick={this.getMore} disabled={loading}>{loading ? 'Loading...' : 'Get More'}</button>}
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
    console.log('state: ', state);
    return {
        posts: state.postsData.posts,
        postsHasMore: state.postsData.postsHasMore
    }
}

const mapDispatchToProps = {
    getReduxPosts,
    setReduxPosts,
    setPostsHasMore,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
