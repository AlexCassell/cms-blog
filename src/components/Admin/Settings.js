// eslint-disable-next-line
import React, { Component } from 'react';
import AdminMenu from './Navigation';
import {email, displayName} from './Login';

import './css/settings.css';

let userDisplayName;

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            content: '',
        };
}

    componentWillMount(){

    }

    componentDidMount(){

    }


render() {
    return (
    <div className="settingsWrapper">
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