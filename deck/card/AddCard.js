import React from 'react'
import { Keyboard, KeyboardAvoidingView, Text, TextInput } from 'react-native'
import { red } from '../../utils/colors'
import { Button } from '../../app/Button'
import { connect } from 'react-redux'
import { addCardToDeck } from '../../utils/api'
import { receiveDecks } from '../DeckActions'
import ValidationComponent from 'react-native-form-validator'
import { DefaultStyles } from '../../utils/styles'

class AddCard extends ValidationComponent {
  state = {
    valid: true,
    question: '',
    answer: ''
  }

  submit = () => {
    const valid = this.validate({
      question: { minlength: 3, required: true },
      answer: { minlength: 3, required: true }
    })

    this.setState({ valid })

    if (valid) {
      const card = {
        question: this.state.question,
        answer: this.state.answer
      }

      const { deck } = this.props

      addCardToDeck(deck, card).then(decks => {
        this.setState({ question: '', answer: '' })
        this._question.setNativeProps({ text: '' })
        this._answer.setNativeProps({ text: '' })
        Keyboard.dismiss()
        this.props.dispatch(receiveDecks(decks))
        this.props.navigation.goBack()
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={DefaultStyles.container}>
        <TextInput
          ref={component => (this._question = component)}
          style={
            !this.isFieldInError('question')
              ? DefaultStyles.input
              : [DefaultStyles.input, { borderColor: red }]
          }
          underlineColorAndroid="transparent"
          placeholder="Question"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={this.state.question}
          onChangeText={question => this.setState({ question })}
        />
        {this.isFieldInError('question') &&
          this.getErrorsInField('question').map((errorMessage, key) => (
            <Text key={key} style={DefaultStyles.errorItem}>{errorMessage}</Text>
          ))}
        <TextInput
          ref={component => (this._answer = component)}
          value={this.state.answer}
          style={
            !this.isFieldInError('answer')
              ? DefaultStyles.input
              : [DefaultStyles.input, { borderColor: red }]
          }
          underlineColorAndroid="transparent"
          placeholder="Answer"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={answer => this.setState({ answer })}
        />
        {this.isFieldInError('answer') &&
        this.getErrorsInField('answer').map((errorMessage, key) => (
          <Text key={key} style={DefaultStyles.errorItem}>{errorMessage}</Text>
        ))}
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
