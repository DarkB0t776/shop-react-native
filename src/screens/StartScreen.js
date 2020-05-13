// Core
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';

// Actions
import * as authActions from '../store/actions/auth';

// Constants
import Colors from '../constants/Colors';

const StartScreen = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expireDate } = transformedData;
      const expirationDate = new Date(expireDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
    }

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
