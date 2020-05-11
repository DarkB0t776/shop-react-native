import PRODUCTS from '../../data/products';
import { DELETE_PRODUCT } from '../types';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
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