import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { fetchDecks } from '../utils/api'
import { blue, darkGray, gray, lightGray, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default class DeckList extends Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    fetchDecks().then(decks => {
      this.setState({ decks })
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Deck', {
              key: index,
              title: item.title
            })
          }}
          style={styles.listButton}
        >
          <MaterialCommunityIcons
            style={{}}
            name="cards-outline"
            size={35}
            color={gray}
          />
          <View style={styles.itemText}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: darkGray }}>
              {item.title}
            </Text>
            <Text style={{ color: gray }}>{item.questions.length} cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { decks } = this.state
    return (
      <View style={styles.list}>
        <FlatList
          data={Object.keys(decks).map(key => decks[key])}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: white
  },
  item: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: lightGray
  },
  listButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10
  }
})
