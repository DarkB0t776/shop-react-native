import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

// Constants
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const ProductItem = (
  {
    image,
    title,
    price,
    onViewDetail,
    onAddToCart
  }
) => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price} >${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button color={Colors.primary} title="View Details" onPress={onViewDetail} />
              <Button color={Colors.primary} title="To Cart" onPress={onAddToCart} />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
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
