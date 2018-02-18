import { ADD_DECK, RECEIVE_DECKS } from '../app/types'

export default function decks(state = {}, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.entries
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.entry
      };
    default:
      return state;
  }
}