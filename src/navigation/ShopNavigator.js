// Core
import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
    </ProductsStackNavigator.Navigator>
  );
};
