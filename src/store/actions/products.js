import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_PRODUCTS
} from '../types';
import Product from '../../models/Product';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://shop-e7fc4.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();


      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push(new Product(
          key, 'u1',
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        ))
      }

      dispatch({ type: FETCH_PRODUCTS, payload: loadedProducts });
    } catch (e) {
      throw e;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      const response = await fetch(`https://shop-e7fc4.firebaseio.com/products/${productId}.json`, {
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
  return async (dispatch) => {
    try {
      const response = await fetch('https://shop-e7fc4.firebaseio.com/products.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
          price
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    try {
      const response = await fetch(`https://shop-e7fc4.firebaseio.com/products/${id}.json`, {
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