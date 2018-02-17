import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, provideDecks } from './_decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(provideDecks);
}
