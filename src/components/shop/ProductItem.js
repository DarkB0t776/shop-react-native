import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

// Constants
import Fonts from '../../constants/Fonts';

const ProductItem = (
  {
    image,
    title,
    price,
    onViewDetail,
    onAddToCart,
    children,
    onSelect
  }
) => {

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableNativeFeedback onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price} >${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {children}
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,

  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontFamily: Fonts.openSans.bold,
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: Fonts.openSans.regular,
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default ProductItem
