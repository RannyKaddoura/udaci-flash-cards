import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Navigation from './app/Navigation';
import { Constants } from 'expo';
import { blue } from './utils/colors';

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlashcardsStatusBar backgroundColor={blue} barStyle="light-content" />
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
