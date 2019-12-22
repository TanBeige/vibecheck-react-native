import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, Button, View, ImageBackground, Image  } from 'react-native';
import  {Dimensions } from "react-native";
import { Actions } from 'react-native-router-flux';

import uuid from 'uuid';
import * as Progress from 'react-native-progress';
import Environment from './config/environment.js';
import firebase from './config/firebase.js';


let { StyleSheet } = React;

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
  const [values, setValues] = useState({
      googleResponse: "",
      loading: false,

      smiles: 0,
      logo: '',
      pictureLabels: [],
      nudity: '',
      colorPalette: '',
      timeOfDay: "",
      volume: 0,
      amountOfPeople: 0,
      landmark: "",

      //Final Vibescore
      vibeScore: 0
  })


    
    //The useEffect function is the first thing that runs when this component (file) mounts.
    useEffect(()=>{
      //This is how we parse through the response, theres gotta be a better way
      // Since this is so ugly.... but we can live with it
      setValues({
        ...values,
        nudity: googleResponse['responses'][0]['safeSearchAnnotation']['adult'],
        pictureLabels: googleResponse['responses'][0]['labelAnnotations'],
        colorPalette: googleResponse['responses'][0]['imagePropertiesAnnotation']['dominantColors'],
        timeOfDay: googleResponse['responses'][0],
        volume: googleResponse['responses'][0],
        amountOfPeople: googleResponse['responses'][0],
        landmark: googleResponse['responses'][0],
      })
      //console.log("Vision API Response: ", googleResponse['responses'][0])

      
      //Checks first dominant color nd returns the RGB values of it.
      console.log("color : ", googleResponse['responses'][0]['imagePropertiesAnnotation']['dominantColors']['colors'][0]['color'])
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
                  Labels: {values.pictureLabels} 
                </Text>
            </View>
        </View>
    </View>
   )
}
export default CheckingVibe;