import React from 'react';
import { Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/header.css';


const Navigation = () => {
    return (
        <div>
            <Nav className="header">
                <div className="header__menu">
                    <div className="header__menu__links"><Link to="/" className="Nav-link">Home</Link></div>
                    {/* <div className="header__menu__links"><Link to="/blog/" className="Nav-link">Blog</Link></div> */}
                    <div className="header__menu__links"><Link to="/contact/" className="Nav-link">Contact</Link></div>
                    <div className="header__menu__links"><Link to="/admin/login/" className="Nav-link">Admin</Link></div>
                    {/* <div className="header__menu__links"><Link to="/admin/post/" className="Nav-link">Post</Link></div> */}
                </div>
            </Nav>
        </div>
    );
};
export default Navigation;