import React, { Component } from 'react'
import {
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Keyboard
} from 'react-native'
import { gray, red, white } from '../../utils/colors'
import { Button } from '../../app/Button'
import { connect } from 'react-redux'
import { addCardToDeck } from '../../utils/api'
import { receiveDecks } from '../DeckActions'

class AddCard extends Component {
  state = {
    valid: true,
    question: '',
    answer: ''
  }

  submit = () => {
    const { deck } = this.props
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }
    addCardToDeck(deck, card).then(decks => {
      this.setState({ question: '', answer: '' })
      this._question.setNativeProps({ text: '' })
      this._answer.setNativeProps({ text: '' })
      Keyboard.dismiss()
      this.props.dispatch(receiveDecks(decks))
      this.props.navigation.goBack()
    })
  }

  handleInput = (value, stateProp) => {
    this.setState({
      [stateProp]: value
    })
  }

  render() {
    const { valid } = this.state

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {!valid && (
          <Text style={styles.errorLabel}>
            Please insert at least 3 characters
          </Text>
        )}
        <TextInput
          ref={component => (this._question = component)}
          style={valid ? styles.input : [styles.input, { borderColor: red }]}
          underlineColorAndroid="transparent"
          placeholder="Question"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.handleInput(text, 'question')}
        />
        {!valid && (
          <Text style={styles.errorLabel}>
            Please insert at least 3 characters
          </Text>
        )}
        <TextInput
          ref={component => (this._answer = component)}
          style={valid ? styles.input : [styles.input, { borderColor: red }]}
          underlineColorAndroid="transparent"
          placeholder="Answer"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.handleInput(text, 'answer')}
        />
        <Button outline={false} title="Submit" onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { deck } = navigation.state.params
  return { deck }
}

export default connect(mapStateToProps)(AddCard)

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
  label: {
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20
  },
  errorLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 40,
    marginRight: 40,
    color: red
  }
})
