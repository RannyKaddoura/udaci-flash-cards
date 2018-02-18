import React, { Component } from 'react'
import { View, Text, FlatList, SearchBar } from 'react-native'
import { fetchDecks } from '../utils/api'

export default class DeckList extends Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    fetchDecks().then(decks => {
      this.setState({ decks })
    })
  }

  renderHeader = () => {}

  render() {
    const { decks } = this.state
    return (
      <View>
        <FlatList
          data={Object.keys(decks).map(key => decks[key])}
          renderItem={({ item }) => {
            return <Text>{item.title}</Text>
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}
