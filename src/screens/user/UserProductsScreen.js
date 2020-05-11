// Core
import React, { useLayoutEffect } from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import * as productsActions from '../../store/actions/products';

// Constants
import Colors from '../../constants/Colors';

// Components
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

// Other
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete this item', [
      { text: 'No', styles: 'default' },
      { text: 'Yes', styles: 'destructive', onPress: () => dispatch(productsActions.deleteProduct(id)) },

    ]);
  };

  // Header Options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Products',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName="md-create"
            onPress={() => navigation.navigate('EditProduct')}
          />
        </HeaderButtons>
      )
    });
  });

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => editProductHandler(item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProductHandler(item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )
      }
    />
  )
}

export default UserProductsScreen

