import React, { Component } from "react";

import Post from "components/Post/Post";
import fbService from "api/fbService";

import "./PostDetails.scss";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";
import PostModal from "components/PostModal/PostModal";
export default class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            isEditPopupOpen: false,
            titleValue: "",
            bodyValue: "",
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        fbService.getPost(this.props.match.params.postId)
            .then((data) => {
                this.setState({
                    post: data,
                    titleValue: data.title,
                    bodyValue: data.body
                });
            });
    }

    toggleEditPopup = () => {
        this.setState({
            isEditPopupOpen: !this.state.isEditPopupOpen,
        });
    };

    changeValue = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    savePost = () => {
        fbService
            .updatePost({
                ...this.state.post,
                title: this.state.titleValue,
                body: this.state.bodyValue
            })
            .then((res) => {
                const updatedPost = {
                    ...this.state.post,
                    title: this.state.titleValue,
                    body: this.state.bodyValue
                }
                this.setState({
                    post: updatedPost,
                    isEditPopupOpen: false,
                });
                const { state: { posts } } = this.context;
                if (posts && posts.find(el => el.id === this.state.post.id)) {
                    this.context.dispatch({ type: actionTypes.UPDATE_POST, payload: { post: updatedPost } })
                }
            });
    };

    render() {
        const { post, isEditPopupOpen, titleValue, bodyValue } = this.state;

        if (!post) {
            return null;
        }

        return (
            <div className="product-info">
                <Post post={post} onClick={() => { }} edit={this.toggleEditPopup} />
                <PostModal
                    action={this.savePost}
                    bodyValue={bodyValue}
                    titleValue={titleValue}
                    changeValue={this.changeValue}
                    isOpen={isEditPopupOpen}
                    onClose={this.toggleEditPopup}
                    buttonTitle="Save"
                />
            </div>
        );
    }
}