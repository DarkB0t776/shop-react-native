// Core
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, ActivityIndicator, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as ordersActions from '../../store/actions/orders';

// Constants
import Colors from '../../constants/Colors';

// Components
import OrderItem from '../../components/shop/OrderItem';
import HeaderButton from '../../components/UI/HeaderButton';

// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const OrdersScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(state => state.orders.orders)
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true)
      await dispatch(ordersActions.fetchOrders());
      setIsLoading(false);
    }
    loadOrders();
  }, [dispatch]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
