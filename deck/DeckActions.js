import { RECEIVE_DECKS } from '../app/types'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}
