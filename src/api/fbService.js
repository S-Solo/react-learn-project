import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

import postsMockup from 'data-mockup/posts.mockup';

class FbService {
    constructor() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig)
        }
    }

    inilializePosts = () => {
        firebase.database()
            .ref("posts")
            .set(postsMockup) // method: PUT
    }

    getAllPosts = async () => {
        const res = await firebase.database().ref("posts").get();
        console.log("res: ", res)
        console.log("res.val(): ", res.val())
        return res.val()
    }

    getPosts = async (startAt = 0, endAt = 8) => {
        console.log("startAt: ", startAt)
        console.log("endAt: ", endAt)
        const res = await firebase.database()
            .ref('posts')
            .orderByKey()
            .startAt(startAt.toString())
            .endAt(endAt.toString())
            .get()
        const data = res.toJSON();
        return Object.values(data);
        // return data;
    }

    getPost = async (id) => {
        const res = await firebase.database()
            .ref(`posts/${id}`)
            .get()
        return res.val();
    }

    updatePost = async (postData) => {
        const postRef = firebase.database().ref(`posts/${postData.id}`);
        await postRef.update(postData)
        const res = await postRef.get();
        return res.val();
    }

    deletePost = async (id) => {
        const postRef = firebase.database().ref(`posts/${id}`);
        await postRef.remove();
    }

    createPost = async (postData) => {
        // const res = await firebase.database().ref('posts').push(postData)
        // return (await res.get()).val();

        const res = await firebase.database().ref(`posts/${20}`).set(postData)

    }

}

const fbService = new FbService();
export default fbService;