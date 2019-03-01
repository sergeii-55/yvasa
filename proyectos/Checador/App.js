import * as Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';


import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

import firebase from 'firebase'
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  render() {
    return <AppNavigator/>;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f70',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
