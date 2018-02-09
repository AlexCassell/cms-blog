/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import AdminMenu from './Navigation';
import {email, displayName} from './Login';
import Location from './Location';
import {city, state} from './Location';

import './css/settings.css';

let userLocation;

let publicProfile = true, adminEmails = true, actualLocation = "", anyoneCanRegister = false;

//blog settings
let blogName = "Simulism Blogger", blogTagLine = "My Place on the Interwebs", dateFormat = "M D, Y", timeFormat = "12:h A";
let useAnalytics = true;

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': '',
            'publicProfile': true,
            'adminEmails': true,
            'anyoneCanRegister': false,
            'getLocation': <Location />
        };
        this.handleProfileInput = this.handleProfileInput.bind(this);
        this.handleAdminEmailInput = this.handleAdminEmailInput.bind(this);
}

    componentWillMount(){
        this.setState({
            getLocation: <Location />            
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

    handleRegisterInput(){
        this.setState({
            anyoneCanRegister: !this.state.anyoneCanRegister,
        });
        anyoneCanRegister = !this.state.anyoneCanRegister;
        console.log(anyoneCanRegister);
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
                            <span className="settings__item__title">Public Profile:</span><input className="settings__checkbox" type="checkbox" onChange={this.handleProfileInput} checked={this.state.publicProfile} name="displayName" />
                            <span className="settings__item__title">Receive Admin Emails:</span><input className="settings__checkbox" type="checkbox" onChange={this.handleAdminEmailInput} checked={this.state.adminEmails} name="displayName" />
                        </form>
                    </div>
                    <div className="settings_block">
                    <div className="settings__title">
                            Blog Settings
                        </div>
                        <form className="settings__item">
                            <span className="settings__item__title">Blog Name:</span><input className="settings__form" placeholder={blogName} type="text" name="displayName" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Blog Tag Line:</span><input className="settings__form" placeholder={blogTagLine} type="text" name="displayName" />
                        </form>
                            <div>
                                <div className="settings__item__info__title">
                                    Date Templates:
                                </div>
                                <div className="settings__item__info">
                                    M D, Y = January 01, 2018
                                </div>
                                <div className="settings__item__info">                                
                                    M/D/Y = 01/01/2018
                                </div>
                                <div className="settings__item__info">
                                    M-D-Y = 01-01-2018
                                </div>
                            </div>
                        <form className="settings__item">
                            <span className="settings__item__title">Date Format:</span><input className="settings__form" placeholder={dateFormat} type="text" name="displayName" />
                        </form>
                        <div>
                            <div className="settings__item__info__title">
                                Time Templates:
                            </div>
                            <div className="settings__item__info">
                                12:h A = 1:30 AM
                            </div>
                            <div className="settings__item__info">                                
                                12: a = 1 pm
                            </div>
                            <div className="settings__item__info">
                                24:h = 13:30
                            </div>
                        </div>
                        <form className="settings__item">
                            <span className="settings__item__title">Time Format:</span><input className="settings__form" placeholder={timeFormat} type="text" name="displayName" />
                        </form>
                        <form className="settings__item">
                            <span className="settings__item__title">Anyone Can Register to Comment:</span><input className="settings__checkbox" type="checkbox" onChange={this.handleRegisterInput} checked={this.state.anyoneCanRegister} name="displayName" />
                        </form>
                    </div>
                </div>
            </div>
        }
    </div>
        );
    }
}
export default Settings;
export {useAnalytics};