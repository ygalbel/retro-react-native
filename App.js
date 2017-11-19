import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import { FlatList, StyleSheet, StatusBar } from 'react-native';

import * as firebase from 'firebase'; // 4.6.2

import { List, SideMenu, ListItem, Card } from 'react-native-elements'; // 0.18.2

import '@expo/vector-icons'; // 6.2.0

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



class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

class NotificationsScreen extends React.Component {
  render() { return(<View><Text>Notifications</Text></View>)}
}

class RootNavigationScreen extends React.Component {
  

  
  render() { return(<View style={{flex: 1}}>
    <StatusBar hidden/>
    <Text>Retro Application</Text>
    <RootNavigator2/>
  </View>)}
}

class LoginScreen extends React.Component {
  list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }
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
                title={item.item.name}
                avatar={item.item.avatar_url}
                hideChevron={true}
                onPress={() => navigate('Home')}
              />
            );
          }}
          keyExtractor={(item, index) => index}
        /> 
         </Card>
     );} 
}

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
      });
    });

    return;
  }

  render() {
   const { navigate } = this.props.navigation;
    return (
  
      
      <View style={styles.MainContainer}>
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


const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});


const RootNavigator2 = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
});

const RootNavigator = DrawerNavigator({
  Home: {
      screen: RootNavigationScreen
  },
  Notifications: {
      screen: NotificationsScreen
  },
}, {
  //initialRouteName: 'Notifications',
  // Uncomment this if you want to use your own custom drawer component.
  // contentComponent: Drawer
});
export default RootNavigator;




// export default class Movies extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       data: [],
//     };
//   }

//   componentDidMount() {
//     console.log(' Initialize Firebase2');
//     //

//     console.log('itemsRef', itemsRef);
//     itemsRef.on('value', snap => {
//       console.log('value', snap.val());
//       // get children as an array
//       var items = [];
//       snap.forEach(child => {
//         //console.log("child", child.title)
//         //console.log("child.val", child.val().title)
//         items.push(child.val());
//       });

//       this.setState({
//         data: items,
//       });
//     });

//     return;
//   }

//   render() {
//     const MenuComponent = (
//       <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
//         <List containerStyle={{marginBottom: 20}}>
//         {
//           <ListItem
              
//               onPress={() => console.log('something')}
//               avatar="{item.avatar_url}"
//               key="3"
//               title="test"
//               subtitle="{item.subtitle}" />
          
//         }
//         </List>
//       </View>
//     )

//     return (
//       <SideMenu
//       MenuComponent={MenuComponent}>
//       <View style={styles.MainContainer}>
//         <FlatList
//           data={this.state.data}
//           ItemSeparatorComponent={this.FlatListItemSeparator}
//           renderItem={item => {
//             console.log('title', item.item.title);

//             return (
//               <ListItem
//                 title={item.item.title}
//                 subtitle="aaaabbbb4"
//                 avatar={item.item.urlToImage}
//               />
//             );
//           }}
//           keyExtractor={(item, index) => index}
//         />

//       </View>
//           </SideMenu>
//     );
//   }
// }

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
});