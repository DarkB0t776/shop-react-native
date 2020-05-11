// Core
import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import OrderItem from '../../components/shop/OrderItem';
import HeaderButton from '../../components/UI/HeaderButton';


// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const OrdersScreen = ({ navigation }) => {

  const orders = useSelector(state => state.orders.orders)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Your Orders',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      )
    });
  });

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => {
        return (
          <OrderItem
            amount={item.totalAmount}
            date={item.convertedDate}
            items={item.items}
          />
        );
      }}
    />
  )
}


export default OrdersScreen

const styles = StyleSheet.create({})
