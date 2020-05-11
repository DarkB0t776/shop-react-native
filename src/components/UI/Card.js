import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Card = ({ children, style }) => {
  return (
    <View style={{ ...styles.card, ...style }}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  }
})
