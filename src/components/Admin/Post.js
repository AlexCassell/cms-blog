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
let boldOpen = false, italicsOpen = false, underlineOpen = false, indentOpen = false, unorderedListOpen = false, listItemOpen = false, blockQuoteOpen = false, h1Open = false, h2Open = false, h3Open = false;

let insertLink = "", insertLinkText = "";

let tags = [];

class Post extends Component {
    constructor(props) {
    super(props);
    this.state = {
        'savePost': '',
        'postUrl': '',
        'postBody':'',
        'postTitle':'',
        'insert':''
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

    //handle most post title
    handlePostTitleInput(e){
        postTitle = e.target.value;
        this.setState({postTitle: postTitle});
        console.log(this.state.postTitle);
    }

    //handle htnl tags
    handleHTMLTag(e){
        console.log("Fired");
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
                postBody += "<u>"
            }
            else{
                underlineOpen = false;
                postBody += "</u>"
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
        else if (e.target.name === "unorderedList"){
            if(unorderedListOpen === false){
                unorderedListOpen = true;
                postBody += "<ul>"
            }
            else{
                unorderedListOpen = false;
                postBody += "</ul>"
            }
        }
        else if (e.target.name === "listItem"){
            if(listItemOpen === false){
                listItemOpen = true;
                postBody += "<li>"
            }
            else{
                listItemOpen = false;
                postBody += "</li>"
            }
        }
        else if (e.target.name === "h1"){
            if(h1Open === false){
                h1Open = true;
                postBody += "<h1>"
            }
            else{
                h1Open = false;
                postBody += "</h1>"
            }
        }
        else if (e.target.name === "h2"){
            if(h2Open === false){
                h2Open = true;
                postBody += "<h2>"
            }
            else{
                h2Open = false;
                postBody += "</h2>"
            }
        }
        else if (e.target.name === "h3"){
            if(h3Open === false){
                h3Open = true;
                postBody += "<h3>"
            }
            else{
                h3Open = false;
                postBody += "</h3>"
            }
        }
        else if (e.target.name === "lineBreak"){
            postBody += "<br />"
        }
        else if (e.target.name === "link"){
            postBody += '<a href="' + insertLink +'" target="_blank">' + insertLinkText + '</a>'
            this.setState({insert:''});          

        }
        else if (e.target.name === "blockQuote"){
            if(blockQuoteOpen === false){
                blockQuoteOpen = true;
                postBody += '<blockquote cite="' + insertLink + '">';
                this.setState({insert:''});  
            }
            else{
                blockQuoteOpen = false;
                postBody += "</blockquote>"
            }
            
        }

        this.setState({postBody: postBody});
        ReactDOM.findDOMNode(this.refs.post).focus()
    }

        //html tag pop ups -links -img -blockquote
    handleHTMLTagPopUps(e){
        e.preventDefault();
        if(e.target.name === "link"){
            this.setState({insert:
                <div className="HTMLTagPopUp">
                    <div className="popUpItem">
                        Link Location: <input className="popUp__input" type="text" name="link" onChange={ (e) => this.saveLinkVariable(e)} />
                    </div>
                    <div className="popUpItem">
                        Link Text: <input className="popUp__input" type="text" name="linkText" onChange={ (e) => this.saveLinkVariable(e)} />
                    </div>
                    <div className="popUpItem">
                        <button className="insertButton" name="link" onClick={(e) => this.handleHTMLTag(e)}>Insert Link</button>
                    </div>
                </div>
            });
        }
        else if(e.target.name === "blockQuote"){
            if(blockQuoteOpen === false){
                this.setState({insert:
                    <div className="HTMLTagPopUp">
                        <div className="popUpItem">
                            Cite Location: <input className="popUp__input" type="text" name="blockQuote" onChange={ (e) => this.saveLinkVariable(e)} />
                        </div>
                        <div className="popUpItem">
                            <button className="insertButton" name="blockQuote" onClick={(e) => this.handleHTMLTag(e)}>Insert Block Quote</button>
                        </div>
                    </div>
                });
            }
            else{
                this.handleHTMLTag(e);
            }
        }
    }

    saveLinkVariable(e){
        if(e.target.name === "link"){
            insertLink = e.target.value;
        }
        else if(e.target.name === "linkText"){
            insertLinkText = e.target.value;
        }
        else if(e.target.name === "blockQuote"){
            insertLink = e.target.value;
        }
    }

    //post tags
    handlePostTags(e){

    }


    render() {
        return (
            <div className="postWrapper">
                {role === 1 || role === 2 ?
                    <div>
                        <AdminMenu />
                        {this.state.insert}
                        <form className="postFormWrapper">
                            <label className="post__label">
                                <input className="post__item" type="text" name="title" value={this.state.postTitle}  onChange={ (e) => this.handlePostTitleInput(e)} />
                            </label>
                            <div className="post__label">
                                <div className="insertHTML">
                                    <button className="insertHTML__buttons" name="h1" onClick={(e) => this.handleHTMLTag(e)}>h1</button>
                                    <button className="insertHTML__buttons" name="h2" onClick={(e) => this.handleHTMLTag(e)}>h2</button>
                                    <button className="insertHTML__buttons" name="h3" onClick={(e) => this.handleHTMLTag(e)}>h3</button>
                                    <button className="insertHTML__buttons" name="bold" onClick={(e) => this.handleHTMLTag(e)}>Bold</button>
                                    <button className="insertHTML__buttons" name="italics" onClick={(e) => this.handleHTMLTag(e)}>Italics</button>
                                    <button className="insertHTML__buttons" name="underline" onClick={(e) => this.handleHTMLTag(e)}>Underline</button>
                                    <button className="insertHTML__buttons">Image</button>
                                    <button className="insertHTML__buttons" name="link" onClick={(e) => this.handleHTMLTagPopUps(e)}>Link</button>
                                    <button className="insertHTML__buttons" name="indent" onClick={(e) => this.handleHTMLTag(e)}>Indent</button>
                                    <button className="insertHTML__buttons" name="lineBreak" onClick={(e) => this.handleHTMLTag(e)}>Line Break</button>
                                    <button className="insertHTML__buttons" name="blockQuote" onClick={(e) => this.handleHTMLTagPopUps(e)}>Blockquote</button>
                                    <button className="insertHTML__buttons" name="unorderedList" onClick={(e) => this.handleHTMLTag(e)}>ul</button>
                                    <button className="insertHTML__buttons"name="listItem" onClick={(e) => this.handleHTMLTag(e)}>li</button>
                                </div>
                                <textarea ref="post" className="post__item post__content" type="text" name="content" value={this.state.postBody}  onChange={ (e) => this.handlePostInput(e) }/>
                                <div className="content_info">Word Count: 100</div>
                            </div>
                        </form>
                        <form className="buttonsWrapper">
                            <input className="post__button" type="post" defaultValue="Post" />
                            <input className="post__button" type="draft" defaultValue="Draft" />
                        </form>
                        <form className="tagWrapper">
                            <div>Post Tags</div>
                            <input className="tagInput" type="text" name="tags" onChange={ (e) => this.handlePostTags(e)} />
                            <button className="tagButton" name="tags" onClick={(e) => this.handlePostTags(e)}>Add Tag</button>
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