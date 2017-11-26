import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'; // 4.6.2
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

let anim2 = require('../assets/checked_done');

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
  const itemsRef = rootRef.child('items');

 

class AddMessageScreen extends React.Component {
  state = {
    message : '',
    title : '',
    messageSent : false,
    animation: null
  };

     _sendMessage(){
       
        console.log('this', this);
        itemsRef.push({
            title : this.state.title,
            message : this.state.message 
          });
    
    }
    static navigationOptions = {
      title: 'Add Message',
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this._playAnimation();
    }

  
    _playAnimation = () => {
      if (!this.state.animation) {
        this._loadAnimationAsync();
      }
      else {
       // this.animation.reset();
       if(this.animation){
        this.animation.play();
      } 
         
      }
    };
  
    _loadAnimationAsync = async () => {

      let that = this;
      this.setState(
        { animation: anim2 },
        this._playAnimation
        );
      
    };
    
     sendMessage(){
      console.log('this', this.state.title, this.state.message);
      itemsRef.push({
          title : this.state.title,
          message : this.state.message 
        });

        let that = this;
        this.setState({messageSent : true},
          this._playAnimation,
          setTimeout(() => that.props.navigation.navigate('Home'), 3000)
          
        );
    }

    render() {
      
      return (
        <View style={styles.buttonContainer}> 
        {!this.state.messageSent && 
        <View>
          <FormLabel>Title</FormLabel>
          <FormInput  onChangeText={(text) => this.setState({title: text})}
                value={this.state.title}/>
          <FormLabel>Message</FormLabel>
          <FormInput 
                onChangeText={(text) => this.setState({message: text})}
                value={this.state.message}
          />

    <Button onPress={this.sendMessage.bind(this)} title="Submit"
          disabled={this.state.message.length == 0 || this.state.title.length == 0}>
    </Button>
    
        </View>
        }
        {this.state.messageSent && 
            <Lottie
            ref={animation => {
              this.animation = animation;
            }}

              style={{
                width: 300,
                height: 300,
                backgroundColor: '#fff',
              }}
              
              source={anim2}
            />
        }
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
 
  

  export default AddMessageScreen;
