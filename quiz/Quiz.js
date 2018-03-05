import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, green, red, darkGray, gray } from '../utils/colors'
import { Button } from '../app/Button'
import Finished from './Finished'
import { MaterialIcons } from '@expo/vector-icons'

const initialState = {
  currentQuestion: {},
  currentQuestionKey: 0,
  showAnswer: false,
  correctAnswerCount: 0,
  finished: false
}

class Quiz extends Component {

  state = initialState

  /**
   * set fist question as initial if exists
   */
  componentDidMount() {
    const { deck } = this.props.navigation.state.params
    if (deck.questions.length > 0) {
      this.setState({
        currentQuestion: deck.questions[0]
      })
    }
  }

  flipCard = () => {
    this.setState(state => ({
      showAnswer: !state.showAnswer
    }))
  }

  submit = isCorrect => {
    if (isCorrect) {
      this.setState(state => ({
        correctAnswerCount: state.correctAnswerCount + 1
      }))
    }

    this.setNextQuestion()
  }

  setNextQuestion = () => {
    const { currentQuestionKey } = this.state
    const { deck } = this.props.navigation.state.params
    const newKey = currentQuestionKey + 1

    this.setState({
      currentQuestion: deck.questions[newKey],
      currentQuestionKey: newKey
    })

    if (newKey === deck.questions.length) {
      this.setState({
        finished: true
      })
    }
  }

  restart = () => {
    this.setState(initialState)
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const { navigation } = this.props
    const {
      currentQuestion,
      currentQuestionKey,
      showAnswer,
      finished,
      correctAnswerCount
    } = this.state

    if (deck.questions.length === 0) {
      return (
        <View>
          <Text>No questions</Text>
        </View>
      )
    }

    if (finished) {
      return (
        <Finished
          deck={deck}
          navigation={navigation}
          percentage={correctAnswerCount / deck.questions.length * 100}
          restart={() => this.restart()}
        />
      )
    }

    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: darkGray }}>
            {!showAnswer
              ? `${currentQuestion.question}?`
              : currentQuestion.answer}
          </Text>
          <Text style={{ color: gray, fontSize: 24 }}>
            {currentQuestionKey + 1} / {deck.questions.length}
          </Text>

          <TouchableOpacity onPress={this.flipCard} style={{ marginTop: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="touch-app" size={14} />
              <Text style={{ padding: 0 }}>
                {showAnswer ? ' Question' : ' Answer'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Button
              title="Yes"
              onPress={() => this.submit(true)}
              buttonStyle={{ backgroundColor: green, marginBottom: 10 }}
            />
            <Button
              title="No"
              onPress={() => this.submit(false)}
              buttonStyle={{ backgroundColor: red }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-around'
  }
})
