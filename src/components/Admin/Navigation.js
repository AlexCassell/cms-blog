import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

import {role} from './Login';

import './css/adminHeader.css';


class AdminMenu extends Component {
    constructor() {
        super();
        this.state = {
            menu: '',
        };
}

    componentWillMount(){
        
    }

    componentDidMount(){
        this.setMenuByRole();
    }

    setMenuByRole(){
        if(role === 1){
            this.setState({menu:
                <div className="adminHeader__menu">
                    <div className="adminHeader__menu__links"><Link to="/admin/moderate/" className="Nav-link">Moderate</Link></div>
                    <div className="adminHeader__menu__links"><Link to="/admin/post/" className="Nav-link">Post</Link></div>
                    <div className="adminHeader__menu__links"><Link to="/admin/profile/" className="Nav-link">Profile</Link></div>
                    <div className="adminHeader__menu__links"><Link to="/admin/settings/" className="Nav-link">Settings</Link></div>
                </div>
            });
        }
        else if(role === 2){
            this.setState({menu:
                <div className="adminHeader__menu">
                    <div className="adminHeader__menu__links"><Link to="/admin/post/" className="Nav-link">Post</Link></div>
                    <div className="adminHeader__menu__links"><Link to="/admin/profile/" className="Nav-link">Profile</Link></div>
                    <div className="adminHeader__menu__links"><Link to="/admin/settings/" className="Nav-link">Settings</Link></div>
                </div>
            });
        }
        else if(role === 3){            
            this.setState({menu:
            <div className="adminHeader__menu">
                <div className="adminHeader__menu__links"><Link to="/admin/profile/" className="Nav-link">Profile</Link></div>
                <div className="adminHeader__menu__links"><Link to="/admin/settings/" className="Nav-link">Settings</Link></div>
            </div>
        });
        }

    }


render() {
    return (
        <div>
            <Nav className="adminHeader">      
                    {this.state.menu}
            </Nav>
        </div>
        );
    }
}
export default AdminMenu;