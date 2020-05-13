// Core
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// Navigators
import { ShopNavigator, AuthNavigator } from './ShopNavigator';

// Screens
import StartScreen from '../screens/StartScreen';

const AppNavigator = props => {

  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;