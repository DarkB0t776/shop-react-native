// Core
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

// Constants
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

// Components
import CartItem from "../../components/shop/CartItem";
import Card from '../../components/UI/Card'

const CartScreen = ({ navigation }) => {


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
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Your Cart'
    });
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          color={Colors.secondary}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => <CartItem
          quantity={item.quantity}
          title={item.productTitle}
          amount={item.sum}
          onRemove={() => dispatch(cartActions.removeFromCart(item.productId))}
          deletable
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
  },
  summaryText: {
    fontFamily: Fonts.openSans.bold,
    fontSize: 18
  },
  amount: {
    color: Colors.secondary
  }
})
