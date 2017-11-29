import { Button } from 'react-native-elements'
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, Image  } from 'react-native';
import { Expo } from 'expo';
import * as firebase from 'firebase'; // 4.6.2
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import Carousel from 'react-native-snap-carousel';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';



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
          console.log('value', snap.val());
          var items = [];
          keys.forEach(k => {
            console.log('keys', k, snapVal[k]);
            items.push({key: k, value : snapVal[k], url:baseImgUrl + k + '.jpeg'});
          })
          
          console.log(items);
          this.setState({
            memes: items,
            isLoading : false
          });
        });
    
        return;
      }    
      _addPicture() {
        console.log('add picture');
        /*let result = await Expo.ImagePicker.launchImageLibraryAsync();

        console.log(result);

        if(result.canceled){
          return;
        }

        // upload to firebase
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child('images/try.jpeg');
        let str = await Expo.FileSystem.readAsStringAsybc(result.uri);
        console.log('str', str);
        imageRef.putString(str, 'base64').then(function(snapshot){
          console.log(snapshot);
          console.log('uploaded!');
        })*/
      }
      _changeStars(key, curr, value){
        console.log('here');
        rootRef.child('memes/' + key).update({stars : curr + value});
      }
      _renderItem ({item, index}) {
        console.log(this);
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
   
    
  
    export default MemeScreen;
  