import React from 'react'
import { Button as NativeButton } from 'react-native-elements'
import { blue, gray, red, white } from '../utils/colors'
import { Platform, StyleSheet } from 'react-native'

export function Button(props) {
  return (
    <NativeButton
      buttonStyle={[
        styles.button,
        Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
      ]}
      textStyle={styles.btnText}
      fontWeight="bold"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: blue,
    height: 45,
    padding: 10
  },
  iosBtn: {
    borderRadius: 7
  },
  androidBtn: {
    borderRadius: 2
  },
  btnText: {
    color: white,
    fontSize: 22
  }
})
