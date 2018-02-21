import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'flashcards:decks'

function setDummyData() {
  const decks = [
    {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  ]
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

export function provideDecks(result) {

  if (result === null) {
    return {};
  }

  return JSON.parse(result)
}
