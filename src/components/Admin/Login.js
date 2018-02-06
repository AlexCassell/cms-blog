import React, { Component } from 'react';
// eslint-disable-next-line
import firebase, { auth, provider } from '../firebase.js';
import AdminMenu from './Navigation';
import './css/login.css';

let email = null, displayName, profilePicture;

let role = 1; //1 admin all menus //2 poster //3 reader/commenter //will be saved and loaded by server

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            username: '',
            adminMenu: '',
            user: null
        };
}

componentDidMount() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            this.setState({ user });
        } 
    });
}

    componentWillMount(){
    }

    handleChange(e) {
        
    }
    
    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
        }
    
        login() {
            auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
            // setTimeout(this.redirectAfterLogin.bind(this), 4000);
        }

        redirectAfterLogin(){
            if(email !== null){
                this.props.history.push('/');
            }
            else{
                setTimeout(this.redirectAfterLogin.bind(this), 200);
            }
        }

        setUser(){
            email = this.state.user.email;
            displayName = this.state.user.displayName;
            profilePicture = this.state.user.photoURL;
            console.log(email)
        }


    render() {
        return (
            <div className='loginWrapper'>
                <div className="adminMenu">
                {this.state.user ?
                            <div>
                                <AdminMenu />
                            </div>    
                            :
                            <div />         
                        }
                </div>
                    <div className="login-logout">
                    <h1>Sign in with your Google Account</h1>
                        {this.state.user ?
                            <div>
                                <div className="googleLogin">

                                </div>
                                <button className="login-logout__button" onClick={this.logout}>Log Out <span role="img" aria-label="sad face">😭</span></button>                
                                <div className="welcome">Welcome<br /> {this.state.user.displayName}!</div>
                            </div>    
                            :
                            <button className="login-logout__button" onClick={this.login}>Google Login</button>              
                        }
                    </div>
                {this.state.user ?
                    <div>
                        <div className='user-profile'>
                            {/* <img className="profile-image"  alt={this.state.user.displayName || this.state.user.email} src={this.state.user.photoURL} /> */}
                            {this.setUser()}
                            
                        </div>
                    </div>
                    :
                    <div className='wrapper'>
                        {/* <p>You must be logged in to this</p> */}
                    </div>
                }
            </div>
        );
    }
}
export default Login;
export {email};
export {displayName};
export {profilePicture};
export {role};