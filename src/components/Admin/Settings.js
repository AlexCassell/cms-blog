// eslint-disable-next-line
import React, { Component } from 'react';
import AdminMenu from './Navigation';
import {email, displayName} from './Login';
import Location from './Location';
import {city, state} from './Location';

import './css/settings.css';

let userDisplayName;
let parseLocation;

let userLocation;

let publicProfile = true, adminEmails = true, location = "";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': '',
            'publicProfile': true,
            'adminEmails': true,
            'getLocation': <Location />
        };
        this.handleProfileInput = this.handleProfileInput.bind(this);
        this.handleAdminEmailInput = this.handleAdminEmailInput.bind(this);
}

    componentWillMount(){
        this.setState({
            'getLocation': <Location />
        });
        this.getLocation();
        // console.log(Location);
    }

    getLocation(){
        if(city === undefined){
            setTimeout(this.getLocation.bind(this), 200);
            // console.log("Trying");
        }
        else{
            userLocation = String(city) + ", " + String(state)
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
                            Basic Settings
                        </div>
                        <form className="settings__item">
                            <span className="settings__item__title">Display Name:</span><input className="settings__form" placeholder={displayName} type="text" name="displayName" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Alert Email:</span><input className="settings__form" placeholder={email} type="text" name="displayName" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Location:</span><input className="settings__form" placeholder={userLocation} type="text" name="displayName" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Website:</span><input className="settings__form" placeholder="https://alexcassell.com" type="text" name="website" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Public Profile:</span><input className="settings__checkbox" type="checkbox" onChange={this.handleProfileInput} checked={this.state.publicProfile} name="displayName" />
                            <span className="settings__item__title">Receive Admin Emails:</span><input className="settings__checkbox" type="checkbox" onChange={this.handleAdminEmailInput} checked={this.state.adminEmails} name="displayName" />
                        </form>
                    </div>
                    <div className="settings_block">
                        words
                    </div>
                </div>
            </div>
        }
    </div>
        );
    }
}
export default Settings;