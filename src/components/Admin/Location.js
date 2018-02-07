// eslint-disable-next-line
import React, { Component } from 'react';

let city, state;

const Location = () => {
    const url = 'https://freegeoip.net/json/';
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            city = responseJson.city;
            state = responseJson.region_name;
    })
    return null;

}
export default Location;
export {city};
export {state};



// { responseType: 'json' }).then(response => {