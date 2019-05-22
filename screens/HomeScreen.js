import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


import {createStackNavigator, createAppContainer} from'react-navigation';

class HomeScreen extends Component{
  render() {
    return (
      <View style={styles.container}>
          <Text>Tela Inicial</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
