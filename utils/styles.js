import React from 'react'
import { StyleSheet } from 'react-native'
import { gray, red, white } from './colors'

export const DefaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    paddingLeft: 15,
    borderColor: gray,
    borderWidth: 1
  },
  label: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 40,
    marginRight: 40
  },
  errorLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    margin: 15,
    marginTop: 0,
    color: red
  },
  errorItem : {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    color: red
  }
})