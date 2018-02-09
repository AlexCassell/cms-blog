import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

import {role} from './Login';

import './css/adminMenu.css';

import moderate from './images/moderate.png'; 
import post from './images/post.png'; 
import profile from './images/profile.png';
import settings from './images/settings.png';


class AdminMenu extends Component {
    constructor() {
        super();
        this.state = {
            menu: '',
        };
}

    componentWillMount(){
        this.setMenuByRole();
    }

    componentDidMount(){
        
    }

    setMenuByRole(){
        if(role === 1){
            this.setState({menu:
                <div className="adminMenu__menu">
                    <div className="adminMenu__menu__links">
                        <Link to="/admin/moderate/" className="Nav-link">
                            <img src={moderate} alt="Moderate" height="25" width="25"/> Moderate
                        </Link>
                    </div>
                    <div className="adminMenu__menu__links">
                        <Link to="/admin/post/" className="Nav-link">
                            <img src={post} alt="Moderate" height="25" width="25"/> Post
                        </Link>
                    </div>
                    <div className="adminMenu__menu__links">
                        <Link to="/admin/profile/" className="Nav-link">
                            <img src={profile} alt="Moderate" height="25" width="25"/> Profile
                        </Link>
                    </div>
                    <div className="adminMenu__menu__links">
                        <Link to="/admin/settings/" className="Nav-link">
                            <img src={settings} alt="Moderate" height="25" width="25"/> Settings
                        </Link>
                    </div>
                </div>
            });
        }
        else if(role === 2){
            this.setState({menu:
                <div className="adminMenu__menu">
                    <div className="adminMenu__menu__links"><Link to="/admin/post/" className="Nav-link">Post</Link></div>
                    <div className="adminMenu__menu__links"><Link to="/admin/profile/" className="Nav-link">Profile</Link></div>
                    <div className="adminMenu__menu__links"><Link to="/admin/settings/" className="Nav-link">Settings</Link></div>
                </div>
            });
        }
        else if(role === 3){            
            this.setState({menu:
            <div className="adminMenu__menu">
                <div className="adminMenu__menu__links"><Link to="/admin/profile/" className="Nav-link">Profile</Link></div>
                <div className="adminMenu__menu__links"><Link to="/admin/settings/" className="Nav-link">Settings</Link></div>
            </div>
        });
        }

    }


render() {
    return (
        <div>
            <Nav className="adminMenu">      
                    {this.state.menu}
            </Nav>
        </div>
        );
    }
}
export default AdminMenu;