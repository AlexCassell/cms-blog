// eslint-disable-next-line
import React, { Component } from 'react';
import AdminMenu from './Navigation';

import './css/moderate.css';
import {role} from './Login';



class Moderate extends Component {
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
    <div className="moderateWrapper">
        {role === 1 ?
            <div>
                <AdminMenu />
                <div className="moderate__contentWrapper">
                    Moderate Comments and Blog posts
                </div>
            </div>
            :
            this.props.history.push('/')        
        }
    </div>
        );
    }
}
export default Moderate;