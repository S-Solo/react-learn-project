import React, { Component } from "react";
import { Modal, Button } from "@material-ui/core";

import Post from "components/Post/Post";
import fbService from "api/fbService";

import "./PostDetails.scss";
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

    changeValue = (name, value) => {
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
                this.setState({
                    post: {
                        ...this.state.post,
                        title: this.state.titleValue,
                        body: this.state.bodyValue
                    },
                    isEditPopupOpen: false,
                });
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
                <Modal
                    className="product-info__modal"
                    open={isEditPopupOpen}
                    onClose={this.toggleEditPopup}
                >
                    <div className="product-info__modal__block">
                        <input
                            value={titleValue}
                            className="product-info__modal__block__input"
                            type="text"
                            onChange={(e) => this.changeValue('titleValue', e.target.value)}
                        />
                        <input
                            value={bodyValue}
                            className="product-info__modal__block__input"
                            type="text"
                            onChange={(e) => this.changeValue('bodyValue', e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.savePost}
                            className="product-info__modal__block__btn"
                            title="Save"
                        >Save</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}