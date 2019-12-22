import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, Button, View, ImageBackground, Image  } from 'react-native';
import {Dimensions } from "react-native";
import { Actions } from 'react-native-router-flux';

let { StyleSheet } = React;

let styles = {
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    }
}

const ImageDisplay = ({image}) => {
    
    console.log("props: ", image)
    const gotoVibeChecker = () => {
        Actions.checkingvibe({uri: image.uri})
    }
   return (
    <View>
        <View >
            <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}} >
                <Image source={{uri: image.uri}} style={styles.backgroundImage}/>
            </View>
            <View style = {{position: 'absolute', top: 500, margin: 128, backgroundColor: 'white', borderRadius: 5}}>
                <Button title="Submit Vibe" onPress={gotoVibeChecker}/>
            </View>
        </View>
    </View>
   )
}
export default ImageDisplay;