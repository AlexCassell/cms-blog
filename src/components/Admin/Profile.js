// eslint-disable-next-line
import React, { Component } from 'react';
import AdminMenu from './Navigation';
import {email} from './Login';

import './css/profile.css';



class Profile extends Component {
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
    <div className="profileWrapper">
        {email === null ?
            this.props.history.push('/')  
            :
            <AdminMenu />       
        }
    </div>
        );
    }
}
export default Profile;