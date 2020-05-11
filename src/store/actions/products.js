import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../types';

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    payload: productId
  };
}

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    payload: {
      title,
      description,
      imageUrl,
      price
    }
  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    payload: {
      title,
      description,
      imageUrl,
    }
  }
};