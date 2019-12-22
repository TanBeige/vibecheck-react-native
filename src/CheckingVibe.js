import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, Button, View, ImageBackground, Image  } from 'react-native';
import {Dimensions } from "react-native";
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

const CheckingVibe = ({uri}) => {
  


    const [values, setValues] = useState({
        googleResponse: "",
        loading: false,
    })

    const gotoCamera = () => {
        Actions.camera()
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
      
        const ref = firebase
          .storage()
          .ref()
          .child(uuid.v4());
        const snapshot = await ref.put(blob);
      
        blob.close();
      
        return await snapshot.ref.getDownloadURL();
      }

    const submitToGoogle = async (uploadUrl) => {
		try {
			setValues({ ...values,  uploading: true });
			let image = uploadUrl;
			let body = JSON.stringify({
				requests: [
					{
						features: [
							{ type: 'LABEL_DETECTION', maxResults: 10 },
							{ type: 'LANDMARK_DETECTION', maxResults: 5 },
							{ type: 'FACE_DETECTION', maxResults: 5 },
							{ type: 'LOGO_DETECTION', maxResults: 5 },
							{ type: 'TEXT_DETECTION', maxResults: 5 },
							{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
							{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
							{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
							{ type: 'CROP_HINTS', maxResults: 5 },
							{ type: 'WEB_DETECTION', maxResults: 5 }
						],
						image: {
							source: {
								imageUri: image
							}
						}
					}
				]
			});
			let response = await fetch(
				'https://vision.googleapis.com/v1/images:annotate?key=' +
					Environment['GOOGLE_CLOUD_VISION_API_KEY'],
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
      );

			let responseJson = await response.json();
			console.log(responseJson);
			setValues({
                ...values,
				googleResponse: responseJson,
				uploading: false
			});
		} catch (error) {
			console.log(error);
		}
    };

    const submitting = async () => {
        const uploadUrl = await uploadImageAsync(uri);

        submitToGoogle(uploadUrl);
    }
    
    
    useEffect(()=>{
      submitting();
    },[])

   return (
    <View>
        <View >
            <View style={{width: Dimensions.get('window').width, top: Dimensions.get('window').height/2.5, alignItems: 'center'}} >
                <Progress.Bar progress={0.3} width={200} />
            </View>
            <View style = {{position: 'absolute', top: Dimensions.get('window').height/3, margin: 128, backgroundColor: 'white', borderRadius: 5}}>
                <Button title="Processing Vibe..." onPress={gotoCamera}/>
            </View>
        </View>
    </View>
   )
}
export default CheckingVibe;