import React from 'react'
import { Button as NativeButton } from 'react-native-elements'
import { blue, gray, red, white } from '../utils/colors'
import { Platform, StyleSheet } from 'react-native'

export function Button(props) {
  const { outline, buttonStyle = {}, ...rest } = props
  return (
    <NativeButton
      buttonStyle={[
        !outline ? styles.button : styles.buttonOutline,
        Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
      ]}
      textStyle={styles.btnText}
      color={!outline ? white : blue}
      fontWeight="bold"
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: blue
  },
  iosBtn: {
    borderRadius: 7
  },
  androidBtn: {
    borderRadius: 2
  },
  btnText: {
    fontSize: 22
  },
  buttonOutline: {
    backgroundColor: white,
    borderColor: blue,
    borderWidth: 1
  }
})
