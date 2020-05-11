// Core
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import { ProductsNavigator } from './ShopNavigator';

const AppNavigator = props => {

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;