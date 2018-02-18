import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Navigation from './app/Navigation'
import { Constants } from 'expo'
import { blue, white } from './utils/colors'
import reducer from './app/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashcardsStatusBar
            backgroundColor={blue}
            barStyle="light-content"
          />
          <Navigation />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
