import service from 'api/service';
import Post from 'components/Post/Post';
import React, { Component } from 'react'

export class PostDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.match.params.postId)
        this.state = {
            post: null
        }
    }

    componentDidMount() {
        service.getPost(this.props.match.params.postId)
            .then(data => {
                this.setState({
                    post: data
                })
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/')
            })
    }

    render() {
        const { post } = this.state;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div style={{margin: '20px 0'}}>
                <Post
                    post={this.state.post}
                />
            </div>
        )
    }
}

export default PostDetails
