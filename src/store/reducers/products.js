import PRODUCTS from '../../data/products';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../types';
import Product from '../../models/Product';


const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      )
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      }
    case UPDATE_PRODUCT:
      const productIdx = state.userProducts.findIndex(prod => prod.id === action.pid);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIdx].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[productIdx].price
      )
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIdx] = updatedProduct;
      const availableProductIdx = state.availableProducts.findIndex(prod => prod.id === action.pid);
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIdx] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(prod => prod.id !== action.payload),
        availableProducts: state.availableProducts.filter(prod => prod.id !== action.payload),
      };
    default:
      return state;
  }
};