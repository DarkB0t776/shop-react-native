// Core
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Constants
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

// Components
import CartItem from './CartItem';
import Card from "../UI/Card";

const OrderItem = ({ amount, date, items }) => {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && <View style={styles.detailItems}>
        {items.map(cartItem => (
          <CartItem
            key={cartItem.productId}
            quantity={cartItem.quantity}
            amount={cartItem.sum}
            title={cartItem.productTitle}
          />
        ))}
      </View>}
    </Card>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  amount: {
    fontFamily: Fonts.openSans.bold,
    fontSize: 16
  },
  date: {
    fontFamily: Fonts.openSans.regular,
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
})
