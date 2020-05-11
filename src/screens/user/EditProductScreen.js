import React, { useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native'

const EditProductScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit Product'
    });
  });
  return (
    <ScrollView>
      <View>
        <Text>The Edit Screen</Text>
      </View>
    </ScrollView>
  )
}

export default EditProductScreen

const styles = StyleSheet.create({})
