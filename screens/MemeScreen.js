import { Button } from 'react-native-elements'
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, Image  } from 'react-native';
import * as firebase from 'firebase'; // 4.6.2
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import Carousel from 'react-native-snap-carousel';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { Expo } from 'expo';
import {ImagePicker, FileSystem} from 'expo';


const baseImgUrl = 'https://sprintretro-d8877.firebaseapp.com/memes/';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCmKl-znvI4HF_Bz6AjspXlfAZyWpBqMGk',
    authDomain: 'sprintretro-d8877.firebaseapp.com',
    databaseURL: 'https://sprintretro-d8877.firebaseio.com',
    projectId: 'sprintretro-d8877',
    storageBucket: 'sprintretro-d8877.appspot.com',
    messagingSenderId: '428608957684',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Create a reference with .ref() instead of new Firebase(url)
  const rootRef = firebase.database().ref();
  const memeRef = rootRef.child('memes');

  
class MemeScreen extends React.Component {
    state = {
      memes : [],
      isLoading : true
    };
  
      constructor(props) {
        super(props);

        this._changeStars = this._changeStars.bind(this);
      }
      componentDidMount() {

        memeRef.on('value', snap => {
          // get children as an array
          var snapVal = snap.val();
          var keys = Object.keys(snapVal);
      //    console.log('value', snap.val());
          var items = [];
          keys.forEach(k => {
            console.log(snapVal[k].url);
            items.push({key: k, value : snapVal[k], url: snapVal[k].url ? snapVal[k].url : baseImgUrl + k + '.jpeg'});
          })
          
         // console.log(items);
          this.setState({
            memes: items,
            isLoading : false
          });
        });
    
        return;
      }    
      _addPicture= async () => {
        let result = await ImagePicker.launchImageLibraryAsync({base64 : true});

        if(result.canceled){
          return;
        }

        // upload to firebase
        var storageRef = firebase.storage().ref();
       /* var imageRef = storageRef.child('images/try.jpeg');


        _uploadAsByteArray(convertToByteArray(result.base64), (progress) => {
          console.log(progress)
        })*/


        let formdata = new FormData();
        console.log(Object.keys(result));
        formdata.append("file","data:image/jpg;base64," + result.base64)
        
        
        fetch('https://api.cloudinary.com/v1_1/disll5nzn/upload?upload_preset=pezejucr',{
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata
          }).then(response => {
            console.log("image uploaded", JSON.parse(response._bodyInit))

            console.log(Object.keys(response));
            console.log("responseUrl", response.url);
            memeRef.push({
              key : new Date().getTime(),
              url : JSON.parse(response._bodyInit).url,
              stars : 0
            })
          }).catch(err => {
            console.log(err)
          })  


  /*      let fileData = "data:image/jpg;base64," + result.base64;

      try{
        fetch("https://api.cloudinary.com/v1_1/disll5nzn/upload?upload_preset=pezejucr",
        {
            method: "POST",
            body: { name: 'file', filename: 'try.jpeg', data :  fileData },
            headers : {
              'Content-Type' : 'multipart/form-data'
            }
        })
        .then(function(res){ return res.json(); })
        .then(function(data){ console.log( data ); })
         
        }
      catch(e){
        console.log(e);
      }*/
    }
      _changeStars(key, curr, value){
        console.log('here');
        rootRef.child('memes/' + key).update({stars : curr + value});
      }
      _renderItem ({item, index}) {
        let j = this;
        return (
            <View>
                <Image style={{  width: window.width * 0.9, height: 300}} key={item.key} source={{uri : item.url}}/>
                <Text>{item.value.stars}</Text>
             
                
                  <Button title="+1" onPress={() => this._changeStars(item.key,item.value.stars, +1)} style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                  <Button title="-1" onPress={() => this._changeStars(item.key,item.value.stars, -1).bind(this,item)} style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            </View>
        );
    }
      render() {
        return (
          <View style={{paddingTop : 80}}>
          <Text>MEMES</Text>
          <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.memes}
          renderItem={this._renderItem}
          sliderWidth={window.width * 0.9}
          itemWidth={window.width * 0.9}
        />
        <Button title="Add picture" onPress={this._addPicture} />
</View>
        );
      }
    }
  
    const styles = StyleSheet.create({
      animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      buttonContainer: {
        paddingTop: 40,
      },
    });
   
    _uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {
      
          try {
      
            var metadata = {
              contentType: 'image/jpeg',
            };
      
            var storageRef = firebase.storage().ref();
            var ref = storageRef.child('images/' +new Date().getTime() + '.jpg')
            let uploadTask = ref.put(pickerResultAsByteArray, metadata)
      
            uploadTask.on('state_changed', function (snapshot) {
      
              progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)
      
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
      
            }, function (error) {
              console.log("in _uploadAsByteArray ", error)
            }, function () {
              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log("_uploadAsByteArray ", uploadTask.snapshot.downloadURL)
            });
      
      
          } catch (ee) {
            console.log("when trying to load _uploadAsByteArray ", ee)
          }
        }

        convertToByteArray = (input) => {
          var binary_string = this.atob(input);
          var len = binary_string.length;
          var bytes = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }
          return bytes
        }
        
        atob = (input) => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      
          let str = input.replace(/=+$/, '');
          let output = '';
      
          if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
          }
          for (let bc = 0, bs = 0, buffer, i = 0;
            buffer = str.charAt(i++);
      
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
              bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
          ) {
            buffer = chars.indexOf(buffer);
          }
      
          return output;
        }
  
        function dataURItoBlob(dataURI) {
          // convert base64/URLEncoded data component to raw binary data held in a string
          var byteString;
          if (dataURI.split(',')[0].indexOf('base64') >= 0)
              byteString = atob(dataURI.split(',')[1]);
          else
              byteString = unescape(dataURI.split(',')[1]);
      
          // separate out the mime component
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      
          // write the bytes of the string to a typed array
          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }
      
          return new Blob([ia], {type:mimeString});
      }
    export default MemeScreen;
  