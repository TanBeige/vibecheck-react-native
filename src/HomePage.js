import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, Button, View, ImageBackground  } from 'react-native';
import { Actions } from 'react-native-router-flux';

let { StyleSheet } = React;

// let styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover', // or 'stretch'
//   }
// });
let styles = {
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    }
  }

const Home = () => {
   const gotoCamera = () => {
      Actions.camera()
   }
   return (
    <View style={{flex: 1, flexDirection: 'row'}}>
        <ImageBackground  source={require('../assets/homeBackground.jpg')} style={styles.backgroundImage}>
        <View style = {{ margin: 128, backgroundColor: 'black', borderRadius: 5}}>
            <Button title="Check Your Vibes..." onPress={gotoCamera} />
        </View>
        </ImageBackground>
    </View>
   )
}
export default Home;