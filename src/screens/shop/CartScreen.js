// Core
import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';

// Constants
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

// Components
import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push(
        {
          productId: key,
          productTitle: state.cart.items[key].productTitle,
          productPrice: state.cart.items[key].productPrice,
          quantity: state.cart.items[key].quantity,
          sum: state.cart.items[key].sum
        }
      )
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button color={Colors.secondary} title="Order Now" disabled={cartItems.length === 0} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => <CartItem
          quantity={item.quantity}
          title={item.productTitle}
          amount={item.sum}
          onRemove={() => { }}
        />
        }
      />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  summaryText: {
    fontFamily: Fonts.openSans.bold,
    fontSize: 18
  },
  amount: {
    color: Colors.secondary
  }
})
