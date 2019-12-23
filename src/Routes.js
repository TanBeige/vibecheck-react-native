import React, {useEffect, useState} from 'react';
import { Router, Scene } from 'react-native-router-flux'
import CameraPage from './camera.page.js';
import HomePage from './HomePage.js';
import ImageDisplay from './ImageDisplay.js';
import CheckingVibe from './CheckingVibe/CheckingVibe.js'

const Routes = () => {

    return (
        <Router>
            <Scene key = "root">
                <Scene key = "home" component = {HomePage} title = "Home" hideNavBar={true}  initial = {true} />
                <Scene key = "camera" hideNavBar={true}  component = {CameraPage} />
                <Scene key = "image" hideNavBar={true}  component = {ImageDisplay} />
                <Scene key = "checkingvibe" hideNavBar={true}  component = {CheckingVibe} />
            </Scene>
        </Router>
    );
}

export default Routes;