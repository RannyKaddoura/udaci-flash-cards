import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { darkGray, white } from '../utils/colors'
import { Button as NativeButton } from 'react-native-elements'
import { Button } from '../app/Button'

export default function Finished(props) {
  const { navigation, percentage, deck, restart } = props

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 40, color: darkGray }}>
          {percentage}% Correct
        </Text>
      </View>
      <View>
        <NativeButton
          outline={true}
          color={darkGray}
          buttonStyle={{ marginBottom: 10 }}
          title="Back"
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Button
          title="Start Again"
          onPress={() => {
            restart()
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-around'
  }
})
