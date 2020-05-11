// Core
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Constants
import Fonts from "../../constants/Fonts";

// Other
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = ({ quantity, title, amount, onRemove, deletable }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
        {deletable && <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Icon name="md-trash" size={23} color="red" />
        </TouchableOpacity>}
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: Fonts.openSans.regular,
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: Fonts.openSans.bold,
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  },
})
