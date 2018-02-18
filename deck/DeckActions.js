import { ADD_DECK, RECEIVE_DECKS } from '../app/types'

export function receiveDeck(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}
