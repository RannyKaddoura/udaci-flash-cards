import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/Navigation';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
