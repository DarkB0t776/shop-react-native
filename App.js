// Core
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import rootReducer from './src/store/reducers/index';

const store = createStore(rootReducer);


const App = () => {
  return (
    <Provider store={store}>
      <View>App 1</View>
    </Provider>
  );
};
export default App;
