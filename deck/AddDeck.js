import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'
import { blue, gray, red, white } from '../utils/colors'
import { addDeck, fetchDecks } from '../utils/api'
import { receiveDecks } from './DeckActions'
import { connect } from 'react-redux'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: '',
    valid: true
  }

  submit = () => {
    const valid = !(this.state.title.length < 3)
    //validate input
    this.setState({ valid })

    if (valid) {
      const newDeck = {
        title: this.state.title,
        questions: []
      }

      addDeck(newDeck).then((decks) => {
        this.setState({ title: '' })
        this._textInput.setNativeProps({ text: '' })
        Keyboard.dismiss()
        this.props.dispatch(receiveDecks(decks))
        this.props.navigation.goBack()
      })
    }
  }

  handleTitle = text => {
    this.setState({ title: text })
  }

  render() {
    const { valid } = this.state

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        {!valid && (
          <Text style={styles.errorLabel}>
            Please insert at least 3 characters
          </Text>
        )}
        <TextInput
          ref={component => (this._textInput = component)}
          style={valid ? styles.input : [styles.input, { borderColor: red }]}
          underlineColorAndroid="transparent"
          placeholder="Title"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleTitle}
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
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
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
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
    marginLeft: 40,
    marginRight: 40,
    color: red
  }
})
