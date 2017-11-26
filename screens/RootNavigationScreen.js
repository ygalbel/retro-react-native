import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import { FlatList, StyleSheet, StatusBar } from 'react-native';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import LoginScreen from './LoginScreen';


const RootNavigator2 = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Chat: {
    screen: ChatScreen,
  }
  
});


class RootNavigationScreen extends React.Component {
    render() { return(<View style={{flex: 1}}>
      <StatusBar hidden/>
      <Text>Retro Application</Text>
      <RootNavigator2/>
    </View>)}
  }

  export default RootNavigationScreen;
  
  