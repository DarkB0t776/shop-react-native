// Core
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as productsActions from '../../store/actions/products';

// Constants
import Fonts from '../../constants/Fonts';

// Components
import HeaderButton from '../../components/UI/HeaderButton';

// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const EditProductScreen = ({ navigation, route }) => {

  const prodId = route.params?.productId;
  const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
    } else {
      dispatch(productsActions.createProduct(title, description, imageUrl, +price));
    }
    navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);


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
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />
        </View>
        {
          editedProduct
            ?
            null
            :
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput style={styles.input} value={price} onChangeText={setPrice} />
            </View>
        }
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />
        </View>
      </View>
    </ScrollView>
  )
}

export default EditProductScreen

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: Fonts.openSans.regular,
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})
