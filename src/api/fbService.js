import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
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
        const data = res.toJSON();
        return Object.values(data);
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

    deletePost = async (id) => { // id = 0

        const postRef = firebase.database().ref(`posts/${id}`); //https://react-learn-ecedd-default-rtdb.firebaseio.com/posts/0
        await postRef.remove();

        const posts = await this.getAllPosts()
        await firebase.database().ref('posts')
            .set(posts.map((el, index) => {
                return {
                    ...el,
                    id: index
                }
            }))
    }

    createPost = async (postData) => {
        const res = await firebase.database()
            .ref('posts')
            .orderByKey()
            .limitToLast(1)
            .get();
        const lastItemJson = res.toJSON();
        const lastItem = Object.values(lastItemJson)[0];
        console.log(lastItem)
        // console.log(lastItem);
        const { id } = lastItem;

        const newItem = {
            ...postData,
            id: id + 1
        }

        await firebase.database()
            .ref(`posts/${id + 1}`)
            .set(newItem)
        return newItem;
        // const res = await firebase.database().ref(`posts/${20}`).set(postData)

    }

    fromResToUser = (res) => {
        const { uid, email, displayName, photoURL } = res.user;
        return { uid, email, displayName, photoURL };
    }

    login = async (credentials) => {
        const res = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        return this.fromResToUser(res);
    }

    signup = async (credentials) => {
        const res = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        const user = firebase.auth().currentUser;
        await user.updateProfile({
            displayName: credentials.name
        })
        return this.fromResToUser(res);
    }

    logout = async () => {
       await firebase.auth().signOut();
    }

}

const fbService = new FbService();
export default fbService;