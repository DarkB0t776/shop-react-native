// Core
import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

// Constants
import Colors from '../../constants/Colors';

// Components
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchProducts);

    return unsubscribe;
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [dispatch, fetchProducts]);



  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    })
  }


  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred!</Text>
        <Button
          title="Try Again"
          onPress={fetchProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  }

  if (!isLoading && products.length === 0) {
    return <View style={styles.centered}>
      <Text>No products</Text>
    </View>
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onSelect={() => selectItemHandler(item.id, item.title)}
      >
        <Button color={Colors.primary} title="View Details" onPress={() => selectItemHandler(item.id, item.title)} />
        <Button color={Colors.primary} title="To Cart" onPress={() => dispatch(cartActions.addToCart(item))} />
      </ProductItem>
      }
    />
  )
}

export const screenOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    )
  }
};

export default ProductsOverviewScreen

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

