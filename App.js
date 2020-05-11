// Core
import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import rootReducer from './src/store/reducers/index';

// Navigators
import AppNavigator from './src/navigation/AppNavigator';

const store = createStore(rootReducer);


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
export default App;
