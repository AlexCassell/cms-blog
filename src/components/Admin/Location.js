// eslint-disable-next-line
import React, { Component } from 'react';

import {useAnalytics} from './Settings';

let city, state;

const Location = () => {
    if(useAnalytics){
        const url = 'https://geo-ip-simulism.herokuapp.com/json/';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                city = responseJson.city;
                state = responseJson.region_name;
        }).catch(error => console.log(error + ": Heroku was probably sleeping."));
        
    }
    return null;
}
export default Location;
export {city};
export {state};
