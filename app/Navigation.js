import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from '../deck/DeckList'
import AddDeck from '../deck/AddDeck'
import Deck from '../deck/Deck'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { blue, darkGray, gray, white } from '../utils/colors'
import { Header } from 'react-native-elements'

const Decks = StackNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list-outline" size={30} color={tintColor} />
        ),
        header: () => {
          return Platform.OS === 'ios' ? (
            <Header
              outerContainerStyles={{ height: 65 }}
              backgroundColor={blue}
              centerComponent={
                <Text
                  style={{ color: white, fontSize: 16, fontWeight: 'bold' }}
                >
                  Mobile Flashcards
                </Text>
              }
            />
          ) : null
        }
      }
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => {
        if (Platform.OS === 'ios') {
          return {
            title: navigation.state.params.title,
            headerRight: <TouchableOpacity style={{marginRight: 10}}
              onPress={() => {
                navigation.goBack()
              }}
            >
              <FontAwesome color={white} name="edit" size={26} />
            </TouchableOpacity>
          }
        }

        return { header: null }
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
        height: 45
      }
    }
  }
)

const Navigation = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list-outline" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: blue,
      inactiveTintColor: darkGray,
      style: {
        height: 56,
        backgroundColor: white,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    }
  }
)

export default Navigation
