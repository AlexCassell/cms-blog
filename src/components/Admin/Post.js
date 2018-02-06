import React, { Component } from 'react';
// eslint-disable-next-line
import firebase, { auth, provider } from '../firebase.js';
import AdminMenu from './Navigation';
import {role} from './Login';
import './css/post.css';



let databaseArray =[];
let postTitle = '';
let postUrl  = '';
let postBody = '';
let postAuthor = '';
// let postNumber = 0;
// eslint-disable-next-line
let currentPostNumber = 0;

class Post extends Component {
    constructor(props) {
    super(props);
    this.state = {
        'savePost': '',
        'postUrl': ''
    };
    this.savePost = this.savePost.bind(this);
}

    componentWillMount(){
        this.loadData();
    }

    savePost(){
        currentPostNumber = (databaseArray[databaseArray.length - 3] + 1);
        this.setState({savePost: ''});  const postRef = firebase.database().ref('posts');
        const item = {
            "postAuthor": postAuthor,
            "postBody": postBody,
            "postNumber": currentPostNumber + 1,
            "postTitle": postTitle,
            "postUrl": postUrl
        }
        postRef.push(item);
        this.setState({postUrl: 
        <div className="postSavedToServer">
            Your post has been saved: <a href={'https://blog.alexcassell.com/posts/' + postTitle}>{'https://blog.alexcassell.com/posts/' + postTitle}</a>
        </div>
            });
    }



    loadData(){
        var query = firebase.database().ref("posts").orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // eslint-disable-next-line
                var key = childSnapshot.key;
                // eslint-disable-next-line
                var childData = childSnapshot.val();
                // eslint-disable-next-line
                for (const [key, value] of Object.entries(childData)) {
                    databaseArray.push(value);
                }
            });
        });
    }

    render() {
        return (
            <div className="postWrapper">
                {role === 1 || role === 2 ?
                    <div>
                        <AdminMenu />
                        <form className="postFormWrapper">
                            <label className="post__label">
                                Title:
                                <input className="post__item" type="text" name="title" />
                            </label>
                            <label className="post__label">
                                Content:
                                <input className="post__item post__content" type="text" name="content" />
                            </label>
                            <input className="post__button" type="submit" value="Submit" />
                        </form>
                    </div>
                    :
                    this.props.history.push('/')       
                }
            </div>
            )
        }
    }

export default Post;