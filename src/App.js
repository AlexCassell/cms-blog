import React from 'react';

import Navigation from './components/Navigation';
import { Main, About, Blog, Contact } from './components';
// eslint-disable-next-line
import Login from './components/Admin/Login';
import Post from './components/Admin/Post';
import Profile from './components/Admin/Profile';
import Settings from './components/Admin/Settings';
import Moderate from './components/Admin/Moderate';
import { Route } from 'react-router-dom';
import './css/app.css';


const App = () => (
  <div>
    <Navigation />
    <Route exact path="/" component={ Main }/>
    <Route exact path="/blog/" component={ Blog }/>
    <Route path="/about/" component={ About }/>
    <Route path="/contact/" component={ Contact }/>
    <Route path="/admin/login/" component={ Login }/>
    <Route path="/admin/profile/" component={ Profile }/>
    <Route path="/admin/post/" component={ Post }/>
    <Route path="/admin/post/preview" component={ Post }/>
    <Route path="/admin/settings/" component={ Settings }/>
    <Route path="/admin/moderate/" component={ Moderate }/>
  </div>
);
export default App;