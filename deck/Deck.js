import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from '../app/Button'
import { darkGray, gray, white } from '../utils/colors'
import { Button as NativeButton } from 'react-native-elements'

class Deck extends Component {
  render() {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: darkGray }}>
            {deck.title}
          </Text>
          <Text style={{ color: gray, fontSize: 24 }}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <NativeButton buttonStyle={{marginBottom: 10}} outline={true} color={darkGray} title="Add Card" />
          <Button title="Start Quiz" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-around'
  },
})
