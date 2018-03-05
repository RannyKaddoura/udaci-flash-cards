import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native'
import { red, white } from '../utils/colors'
import { addDeck } from '../utils/api'
import { receiveDecks } from './DeckActions'
import { connect } from 'react-redux'
import { Button } from '../app/Button'
import ValidationComponent from 'react-native-form-validator'
import { DefaultStyles } from '../utils/styles'

class AddDeck extends ValidationComponent {
  state = {
    title: '',
    valid: true
  }

  submit = () => {
    const valid = this.validate({
      title: { minlength: 3, required: true }
    })

    this.setState({ valid })

    if (valid) {
      const newDeck = {
        title: this.state.title,
        questions: []
      }

      addDeck(newDeck).then(decks => {
        this.setState({ title: '' })
        this._textInput.setNativeProps({ text: '' })
        Keyboard.dismiss()
        this.props.dispatch(receiveDecks(decks))
        this.props.navigation.navigate('DeckList')
      })
    }
  }

  render() {
    const { valid } = this.state

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={DefaultStyles.label}>What is the title of your new deck?</Text>
        <TextInput
          ref={component => (this._textInput = component)}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          style={
            valid ? DefaultStyles.input : [DefaultStyles.input, { borderColor: red }]
          }
          underlineColorAndroid="transparent"
          placeholder="Title"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
        />
        <Text style={DefaultStyles.errorLabel}>{this.getErrorMessages()}</Text>
        <Button outline={false} title="Submit" onPress={this.submit} />
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
  }
})
