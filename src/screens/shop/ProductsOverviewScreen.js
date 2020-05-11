// Core
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(state => state.products.availableProducts);
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
        onAddToCart={() => { }}
      />}
    />
  )
}

export const screenOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen

const styles = StyleSheet.create({})

