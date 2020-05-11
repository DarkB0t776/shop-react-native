// Core
import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Constants
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts';

// Screens
import ProductsOverviewScreen, { screenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const ProductsStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: Fonts.openSans.bold
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.openSans.regular
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

export const ProductsNavigator = () => {
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
    </ProductsStackNavigator.Navigator>
  );
};
