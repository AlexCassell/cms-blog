/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import AdminMenu from './Navigation';
import {email, displayName, googleProfileImage} from './Login';
import Location from './Location';
import {city, state} from './Location';

import './css/settings.css';

let userDisplayName;

let userLocation;

let publicProfile = true, adminEmails = true, actualLocation = "";

class PostProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': ''
        };

}

    componentWillMount(){
    }

    getLocation(){
        if(city === undefined){
            setTimeout(this.getLocation.bind(this), 200);
            // console.log("Trying");
        }
        else{
            actualLocation = String(city) + ", " + String(state)
        }
        
    }


    componentDidMount(){

    }

    setSavedSettings(){
            //load from server in another fucntion then call this function
            this.setState({
                publicProfile: publicProfile,
            });
    }

    handleProfileInput(){
        this.setState({
            publicProfile: !this.state.publicProfile,
        });
        publicProfile = !this.state.publicProfile;
        console.log(publicProfile);
    }

    handleAdminEmailInput(){
        this.setState({
            adminEmails: !this.state.adminEmails,
        });
        adminEmails = !this.state.adminEmails;
        console.log(adminEmails);
    }


render() {
    return (
    <div className="settingsWrapper">
        {this.state.getLocation}
        {email === null ?
            this.props.history.push('/')  
            :
            <div>
                <AdminMenu />       
                <div className="changeSettingsWrapper">
                    <div className="settings_block">
                        <div className="settings__title">
                            Profile Settings
                        </div>
                        <form className="settings__item">
                            <span className="settings__item__title">Location:</span><input className="settings__form" placeholder={actualLocation} type="text" name="displayName" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Website:</span><input className="settings__form" placeholder="https://alexcassell.com" type="text" name="website" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Facebook:</span><input className="settings__form" placeholder="User Name" type="text" name="website" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Twitter:</span><input className="settings__form" placeholder="Twitter Handle" type="text" name="website" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Google:</span><input className="settings__form" placeholder="Google Plus Name" type="text" name="website" />
                        </form>
                    </div>
                    <div className="settings_block">
                    <img className="profile-image"  alt="Google Profile" src={googleProfileImage}/>
                        <button>Change Profile Image</button>
                    </div>
                </div>
            </div>
        }
    </div>
        );
    }
}
export default PostProfile;