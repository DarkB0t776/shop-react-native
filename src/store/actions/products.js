import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_PRODUCTS
} from '../types';
import Product from '../../models/Product';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;

      const response = await fetch('https://shop-e7fc4.firebaseio.com/products.json');

      if (!response.ok) {
        console.log(response);
        throw new Error('Something went wrong!');
      }

      const data = await response.json();


      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push(new Product(
          key,
          data[key].ownerId,
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        ))
      }

      dispatch({
        type: FETCH_PRODUCTS,
        payload: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (e) {
      throw e;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`https://shop-e7fc4.firebaseio.com/products/${productId}.json?auth=${token}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      dispatch({
        type: DELETE_PRODUCT,
        payload: productId
      });
    } catch (e) {
      throw e;
    }
  }
}

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;

      const response = await fetch(`https://shop-e7fc4.firebaseio.com/products.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ownerId: userId,
          title,
          description,
          imageUrl,
          price
        })
      });

      const data = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          id: data.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`https://shop-e7fc4.firebaseio.com/products/${id}.json?auth=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        })
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        payload: {
          title,
          description,
          imageUrl,
        }
      }
      )
    } catch (e) {
      throw e;
    }
  }
};