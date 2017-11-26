import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import { FlatList, StyleSheet, StatusBar } from 'react-native';

import * as firebase from 'firebase'; // 4.6.2

import { List, SideMenu, ListItem, Card } from 'react-native-elements'; // 0.18.2
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
let loader = require('../assets/loader');

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
  
  
  
  
  
  class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
      constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: [],
      };
    }
  
    componentDidMount() {
      console.log(' Initialize Firebase2');
      //
  
      console.log('itemsRef', itemsRef);
      itemsRef.on('value', snap => {
        console.log('value', snap.val());
        // get children as an array
        var items = [];
        snap.forEach(child => {
          //console.log("child", child.title)
          //console.log("child.val", child.val().title)
          items.push(child.val());
        });
  
        this.setState({
          data: items,
          isLoading : false
        });
      });
  
      return;
    }
  
    render() {
     const { navigate } = this.props.navigation;
      return (
        
        
        <View style={styles.MainContainer}>
        {this.state.isLoading && 
          <Lottie
          loop
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#eee',
            }}
            source={loader}
          />
          }
          {!this.state.isLoading && 
          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={item => {
              console.log('title', item.item.title);
  
              return (
                <ListItem
                  title={item.item.title}
                  subtitle="aaaabbbb4"
                  avatar={item.item.urlToImage}
                  hideChevron={true}
                  onPress={() => navigate('Chat')}
                />
              );
            }}
            keyExtractor={(item, index) => index}
          />
          }
        </View>
      );
    }
  
    // render() {
    //   const { navigate } = this.props.navigation;
    //   return (
    //     <View>
    //       <Text>Hello, Chat App!</Text>
    //       <Button
    //         onPress={() =>  navigate('Chat')}
    //         title="Chat with Lucy"
    //       />
    //     </View>
    //   );
    // }
  }

  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      margin: 10,
      paddingTop: 20,
    },
    animationContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }
  });
  

  export default HomeScreen;
  