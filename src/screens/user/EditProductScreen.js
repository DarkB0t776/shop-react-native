// Core
import React, { useLayoutEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as productsActions from '../../store/actions/products';


// Components
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';

// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const FORM_UPDATE = 'FORM_UPDATE';

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
const EditProductScreen = ({ navigation, route }) => {

  const prodId = route.params?.productId;
  const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,

    },
    formIsValid: editedProduct ? true : false
  });

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {

    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'Ok' }
      ])
      return;
    }

    if (editedProduct) {
      dispatch(productsActions.updateProduct(
        prodId,
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl
      ));
    } else {
      dispatch(productsActions.createProduct(
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl,
        +formState.inputValues.price
      ));
    }
    navigation.goBack();
  }, [
    dispatch,
    prodId,
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
    formState.formIsValid
  ]);

  const inputChangeHandler = useCallback((inputName, inputValue, isInputValid) => {
    dispatchFormState({
      type: FORM_UPDATE,
      payload: inputValue,
      isValid: isInputValid,
      input: inputName
    })
  }, [dispatchFormState])


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.productId ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="md-checkmark"
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  });
  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          autoCapitalize="sentences"
          errorText="Please enter a title!"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter an image url!"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          initiallyValid={!!editedProduct}
          required
        />
        {
          editedProduct
            ?
            null
            :
            <Input
              id="price"
              label="Price"
              errorText="Please enter a price!"
              keyboardType="numeric"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
        }
        <Input
          id="description"
          label="Description"
          errorText="Please enter a description!"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  )
}

export default EditProductScreen

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
})
