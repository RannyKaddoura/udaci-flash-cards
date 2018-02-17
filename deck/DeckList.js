import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage } from 'react-native'
import { fetchDecks } from '../utils/api';
import { DECKS_STORAGE_KEY } from '../utils/_decks'

export default class DeckList extends Component {

  state = {
    decks: {}
  }

  componentDidMount(){
    fetchDecks()
      .then((decks) => {
        this.setState({decks});
      });
  }

  render() {
    console.log(this.state.decks)
    return (
      <View>
        <FlatList
          data={this.state.decks}
          renderItem={({item}) => {
            return (<Text>{item.title}</Text>);
          }}
        />
      </View>
    );
  }
}
