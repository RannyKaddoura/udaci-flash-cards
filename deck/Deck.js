import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  render() {
    const { deck } = this.props

    return (
      <View>
        <View>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length}</Text>
        </View>
        <View>
          <Text>Quiz starten</Text>
          <Text>Start Quiz</Text>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { key } = navigation.state.params
  const decks = Object.keys(state.decks).map(title => state.decks[title])

  return {
    deck: decks[key]
  }
}

export default connect(mapStateToProps)(Deck)
