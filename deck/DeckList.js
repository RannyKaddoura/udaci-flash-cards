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
    const { decks } = this.state;
    return (
      <View>
        <FlatList
          data={Object.keys(decks).map((key) => (decks[key]))}
          renderItem={({item}) => {
            return (<Text>{item.title}</Text>);
          }}
          keyExtractor={(item, index) => (index)}
        />
      </View>
    );
  }
}
