import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, provideDecks } from './_decks'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(provideDecks)
}

export function addDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(result => {
      if (result === null) {
        return {}
      }
      return JSON.parse(result)
    })
    .then(result => {
      result[deck.title] = deck
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(result))
      return result
    })
}

export function addCardToDeck(deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(result => {
      if (result === null) {
        return {}
      }
      return JSON.parse(result)
    })
    .then(result => {
      result[deck.title].questions.push(card)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(result))
      return result
    })
}
