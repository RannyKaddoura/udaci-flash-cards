import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from '../deck/DeckList';
import AddDeck from '../deck/AddDeck';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { gray, white } from '../utils/colors';

const Navigation = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-list-outline" size={30} color={white} />
      }
    },
    AddDeck : {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor} />
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 56,
        backgroundColor: gray,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        fontSize: 14
      }
    }
  }
);

export default Navigation;
