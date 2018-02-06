import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBVa5Bzqn2ZDJp9bgQvXi58mIp9X5Rab8Q",
    authDomain: "blog-d75e3.firebaseapp.com",
    databaseURL: "https://blog-d75e3.firebaseio.com",
    projectId: "blog-d75e3",
    storageBucket: "blog-d75e3.appspot.com",
    messagingSenderId: "497708227108"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
