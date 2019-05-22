import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator, createAppContainer} from'react-navigation';

import HomeScreen from './screens/HomeScreen';

export default class App extends Component{
  render() {
    return (
      <AppStackNavigator/>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Inicio:{
    screen: HomeScreen,
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
