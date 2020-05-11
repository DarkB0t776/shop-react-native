// Core
import React from 'react';
import { FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as cartActions from '../../store/actions/cart';

// Constants
import Colors from '../../constants/Colors';

// Components
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    })
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

const styles = StyleSheet.create({})

