// Core
import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

// Actions
import * as authActions from '../store/actions/auth';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

// Constants
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts';

// Screens
import ProductsOverviewScreen, { screenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';

// Other
import Icon from 'react-native-vector-icons/Ionicons';

const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
const ShopDrawerNavigator = createDrawerNavigator();

// Default Screen Options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: Fonts.openSans.bold
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.openSans.regular
  },
  headerTintColor: 'white'
};

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={screenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
      />
    </AdminStackNavigator.Navigator>
  );
};


export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => dispatch(authActions.logout())}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Icon name="md-cart" size={23} color={props.color} />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Icon name="md-list" size={23} color={props.color} />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Icon name="md-create" size={23} color={props.color} />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};


export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
}