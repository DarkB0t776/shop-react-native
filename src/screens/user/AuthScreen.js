// Core
import React, {
  useState,
  useLayoutEffect,
  useReducer,
  useCallback,
  useEffect
} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';

//Actions
import * as authActions from '../../store/actions/auth';

// Constants
import Colors from '../../constants/Colors';

// Components
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';

// Other
import LinearGradient from 'react-native-linear-gradient';


// Types
const FORM_UPDATE = 'FORM_UPDATE';

// Reducers
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.payload
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      }
      let formIsValid = true;
      for (const key in updatedValidities) {
        formIsValid = formIsValid && updatedValidities[key];
      }
      return {
        formIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      }
    default:
      return state;
  }
};

// Component
const AuthScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false

    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [
        { text: 'Ok' }
      ]);
    }
  }, [error]);


  // Handlers
  const inputChangeHandler = useCallback((inputName, inputValue, isInputValid) => {

    dispatchFormState({
      type: FORM_UPDATE,
      payload: inputValue,
      isValid: isInputValid,
      input: inputName
    })
  }, [dispatchFormState]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    }
    setError('');
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  // Header Options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Authenticate'
    });
  }, []);

  return (
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
      <View style={styles.screen}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              minLength={6}
              required
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {
                isLoading
                  ?
                  <ActivityIndicator size="small" color={Colors.primary} />
                  :
                  <Button
                    title={isSignup ? 'Sign Up' : 'Login'}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
              }
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.secondary}
                onPress={() => setIsSignup(!isSignup)}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </LinearGradient>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 10
  },
  buttonContainer: {
    marginTop: 10
  }
})
