import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, Button, View, ImageBackground, Image  } from 'react-native';
import  {Dimensions } from "react-native";
import { Actions } from 'react-native-router-flux';

import uuid from 'uuid';
import * as Progress from 'react-native-progress';
import Environment from '../config/environment.js';
import firebase from '../config/firebase.js';

// variable Styles is for inline styling
let styles = {
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    }
}

/*
What Will be Checked
- Faces - smiles
- Logos - it aint ralph doe!
- Explicit Content filter - titty detection
- Color palette - dominant colors
- Time of day
- Volume? 
- # of people in the picture/guy to girl ratio
- Location/Landmark detection - no deductions, only +points for cool places
*/

const CheckingVibe = ({googleResponse}) => {

  //This is the state. it holds all the information of our component that we can change.
  //  I don't think we ened this yet, but we will eventually
  const [values, setValues] = useState({
    // Loading if we are doing other things  
    loading: false,
    //Final Vibescore
    vibeScore: 0
  })

  //Calculate Vibe Score With High Tech Titty Finding Algorithm
  const getVibeScore = (response) => {
    console.log("Checking Vibe")
    console.log("Current Vibe: ", response)

    // Parse response
    const nudity = response.responses[0].safeSearchAnnotation['adult'];
    const logos = response.responses[0].logoAnnotations;  //Response doesn't have this for some reason
    const labels = response.responses[0].labelAnnotations;
    const faces = response.responses[0].faceAnnotations;
    const colors = response.responses[0].imagePropertiesAnnotation.dominantColors.colors;

    // Print out parsed response variables
    console.log("Nudity: ", nudity)

    console.log("Logos: ", logos)
    if(logos) {
      logos.forEach(logo => console.log(`- ${logo.description}`));
    }
    console.log("Labels: ")
    if(labels) {
      labels.forEach(label => console.log(`- ${label.description}`));
    }
    console.log("Faces: ")
    if(faces) {
      faces.forEach(face => console.log(`- Angry: ${face.angerLikelihood}\n- Blurred: ${face.blurredLikelihood}\n- Joy: ${face.joyLikelihood}`));
    }
    console.log("Colors: ")
    if(colors) {
      colors.forEach(color => {
        console.log(`Red: ${color.color.red}, Green: ${color.color.green}, Blue: ${color.color.blue}`)
        console.log(" HEX: #", fullColorHex(color.color.red, color.color.green, color.color.blue))
      });
    }


    // Calculate Score
    let score = 0;
    if(nudity === 'VERY_LIKELY') {
      score += 10;
    }
    console.log("Score: ", score)
  }

  //-----The useEffect function is the first thing that runs when this component (file) mounts. ------
  useEffect(()=>{
    //Get Vibe Score
    getVibeScore(googleResponse);
  },[])

   return (
    <View>
        <View >
            <View>
                <Text style={{textAlign: 'center', marginTop: 300}}>
                  Your Vibes: 
                </Text>
                <Text style={{textAlign: 'center', marginTop: 20}}>
                  Score: {values.vibeScore}
                </Text>
                <Text style={{textAlign: 'center', marginTop: 20}}>
                  Vibe Info:
                  Nudity: {values.nudity}
                </Text>
            </View>
        </View>
    </View>
   )
}
export default CheckingVibe;


//Next 2 Functions are used to convert RGB to Hexadecimal
var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
        hex = "0" + hex;
  }
  return hex;
};
var fullColorHex = function (r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};