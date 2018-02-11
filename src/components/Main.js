// eslint-disable-next-line
import React, { Component } from 'react';
import '../css/home.css';
import Location from './Admin/Location';
import {email} from './Admin/Login'

// componentDidMount() {
//     window.addEventListener("resize", this.resize.bind(this));
//     this.resize();
// }

// resize() {
//     this.setState({hideNav: window.innerWidth <= 760});
// }




class Main extends Component {
    constructor() {
        super();
        this.state = {
            "content": '',
            "getLocation": ''
        };
}

    componentWillMount(){
        this.loggedIn();
        this.setState({
            'getLocation': <Location />
        });
    }

    componentDidMount(){
        this.loggedIn();
    }




    loggedIn(){
        email === null ?
        this.setState({content: <div>out</div>}) 
            :
        this.setState({content: <div>in</div>})   
    }

render() {
    return (
    <div className="homeWrapper">
        {email === null ?
            <div>out</div>
            :
            <div>in</div>
        }
    </div>
        );
    }
}
export default Main;