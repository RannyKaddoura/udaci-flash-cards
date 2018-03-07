import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { fetchDecks } from '../utils/api'
import { darkGray, gray, lightGray, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { receiveDecks } from './DeckActions'
import { connect } from 'react-redux'

class DeckList extends Component {
  componentDidMount() {
    this.fetchDecks()
  }

  fetchDecks = () => {
    fetchDecks().then(decks => {
      this.props.dispatch(receiveDecks(decks))
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Deck', {
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
    const { decks } = this.props
    const data = Object.keys(decks)
      .map(key => decks[key])
      .reverse()

    if (!data || data.length === 0) {
      return <Text style={styles.item}>No Decks, start by adding new ones</Text>
    }

    return (
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const mapStateToProps = decks => {
  return decks
}
export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: white
  },
  item: {
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
