import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import RootNavigationScreen from './RootNavigationScreen';

import NotificationsScreen from './NotificationsScreen';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import LoginScreen from './LoginScreen';
import LottieScreen from './LottieScreen';
import AddMessage from './AddMessage';

const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});



const RootNavigator = DrawerNavigator({
    Home: {
        screen: RootNavigationScreen
    },
    Lottie : {
        screen : LottieScreen
    },
    Notifications: {
        screen: NotificationsScreen
    },
    AddMessage :{
      screen: AddMessage
    }
  }, {
    //initialRouteName: 'Notifications',
    // Uncomment this if you want to use your own custom drawer component.
    // contentComponent: Drawer
  });
console.log('RootNavigator2', RootNavigator);

  export default RootNavigator;
  
