/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

//tag elements
let boldOpen = false, italicsOpen = false, underlineOpen = false, indentOpen = false;

class Post extends Component {
    constructor(props) {
    super(props);
    this.state = {
        'savePost': '',
        'postUrl': '',
        'postBody':'',
        'postTitle':'',
        'livePreview':''
    };
    this.savePost = this.savePost.bind(this);
}

    componentWillMount(){
        this.loadData();
        this.setState({postBody: postBody});
        this.setState({postTitle: postTitle});

            }

    componentDidMount(){
        console.log(postBody);
        console.log(this.state.postBody);
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

    //handle post elements

    //handle post body
    handlePostInput(e){
        postBody = e.target.value;
        this.setState({postBody: postBody});
        console.log(this.state.postBody);
    }

    //handle post title
    handlePostTitleInput(e){
        postTitle = e.target.value;
        this.setState({postTitle: postTitle});
        console.log(this.state.postTitle);
    }

    //handle htnl tags
    handleHTMLTag(e){
        e.preventDefault();
        console.log(e.target.name);
        if(e.target.name === "bold"){
            if(boldOpen === false){
                boldOpen = true;
                postBody += "<strong>"
            }
            else{
                boldOpen = false;
                postBody += "</strong>"
            }
        }
        else if (e.target.name === "italics"){
            if(italicsOpen === false){
                italicsOpen = true;
                postBody += "<em>"
            }
            else{
                italicsOpen = false;
                postBody += "</em>"
            }
        }
        else if (e.target.name === "underline"){
            if(underlineOpen === false){
                underlineOpen = true;
                postBody += "<ul>"
            }
            else{
                underlineOpen = false;
                postBody += "</ul>"
            }
        }
        else if (e.target.name === "indent"){
            if(indentOpen === false){
                indentOpen = true;
                postBody += '<p class="indent">'
            }
            else{
                indentOpen = false;
                postBody += "</p>"
            }
        }

        this.setState({postBody: postBody});
        ReactDOM.findDOMNode(this.refs.post).focus()
    }


    render() {
        return (
            <div className="postWrapper">
                {role === 1 || role === 2 ?
                    <div>
                        <AdminMenu />
                        <form className="postFormWrapper">
                            <label className="post__label">
                                <input className="post__item" type="text" name="title" value={this.state.postTitle}  onChange={ (e) => this.handlePostTitleInput(e)} />
                            </label>
                            <div className="post__label">
                                <div className="insertHTML">
                                    <button className="insertHTML__buttons" name="bold" onClick={(e) => this.handleHTMLTag(e)}>Bold</button>
                                    <button className="insertHTML__buttons" name="italics" onClick={(e) => this.handleHTMLTag(e)}>Italics</button>
                                    <button className="insertHTML__buttons" name="underline" onClick={(e) => this.handleHTMLTag(e)}>Underline</button>
                                    <button className="insertHTML__buttons">Image</button>
                                    <button className="insertHTML__buttons">Link</button>
                                    <button className="insertHTML__buttons" name="indent" onClick={(e) => this.handleHTMLTag(e)}>Indent</button>
                                    <button className="insertHTML__buttons">Line Break</button>
                                    <button className="insertHTML__buttons">Blockquote</button>
                                    <button className="insertHTML__buttons">ul</button>
                                    <button className="insertHTML__buttons">li</button>
                                </div>
                                <textarea ref="post" className="post__item post__content" type="text" name="content" value={this.state.postBody}  onChange={ (e) => this.handlePostInput(e) }/>
                                <div className="content_info">Word Count: 100</div>
                            </div>
                        </form>
                        <form className="buttonsWrapper">
                            <input className="post__button" type="post" defaultValue="Post" />
                            <input className="post__button" type="draft" defaultValue="Draft" />
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