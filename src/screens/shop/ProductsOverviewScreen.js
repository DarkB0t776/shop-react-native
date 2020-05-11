// Core
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as cartActions from '../../store/actions/cart';

// Components
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(state => state.products.availableProducts);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  console.log(cart);
  return (
    <FlatList
      data={products}
      renderItem={itemData => <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => navigation.navigate('ProductDetail', {
          productId: itemData.item.id,
          productTitle: itemData.item.title
        })}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
      />}
    />
  )
}

export const screenOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen

const styles = StyleSheet.create({})

