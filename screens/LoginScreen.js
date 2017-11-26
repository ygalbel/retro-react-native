import React, { Component } from 'react';
import { Image, View, Text, Button } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { FlatList, StyleSheet, StatusBar } from 'react-native';
import { List, SideMenu, ListItem, Card } from 'react-native-elements'; // 0.18.2


const baseImgUrl = 'https://sprintretro-d8877.firebaseapp.com/assets/avatars/';
class LoginScreen extends React.Component {
    list = [
      {
        name: 'Ori Bracha',
        avatar_url: baseImgUrl + 'bracha.png',
      },
      {
        name: 'Dan Ko',
        avatar_url: baseImgUrl + 'danko.png',
      },
      {
        name: 'Dan Shapir',
        avatar_url: baseImgUrl + 'dansh.png',
      },
      {
        name: 'Gal Tadmor',
        avatar_url: baseImgUrl + 'gal.png',
      },
      {
        name: 'Hila',
        avatar_url: baseImgUrl + 'hila.png',
      },
      {
        name: 'Eli Katzav',
        avatar_url: baseImgUrl + 'katzav.png',
      },
      {
        name: 'Koby da',
        avatar_url: baseImgUrl + 'kobi.png',
      },
      {
        name: 'Maayan',
        avatar_url: baseImgUrl + 'maayan.png',
      },
      {
        name: 'Oleg',
        avatar_url: baseImgUrl + 'oleg.png',
      },
      {
        name: 'Or romano',
        avatar_url: baseImgUrl + 'or.png',
      },
      {
        name: 'Revital',
        avatar_url: baseImgUrl + 'revital.png',
      },
      {
        name: 'Tomer',
        avatar_url: baseImgUrl + 'tomer.png',
      },
      {
        name: 'Ygal',
        avatar_url: baseImgUrl + 'ygal.png',
      },
    ]
    
    render() {
      const { navigate } = this.props.navigation;
       return (
         <Card title="Choose Your Avatar">
          <FlatList
            data={this.list}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={item => {
              console.log('item', item);
              return (
                <ListItem
                  roundAvatar
                  title={item.item.name}
                  avatar={{ uri: item.item.avatar_url}}
                  hideChevron={true}
                  onPress={() => navigate('Home')}
                >
                </ListItem>
              );
            }}
            keyExtractor={(item, index) => index}
          /> 
           </Card>
       );} 
  }

  export default LoginScreen;
  