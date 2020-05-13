import { ADD_ORDER, FETCH_ORDERS } from '../types';
import Order from '../../models/Order';


export const fetchOrders = () => {
  return async (dispatch, getState) => {

    const userId = getState().auth.userId;

    try {
      const response = await fetch(`https://shop-e7fc4.firebaseio.com/orders/${userId}.json`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();


      const loadedOrders = [];

      for (const key in data) {
        loadedOrders.push(
          new Order(
            key,
            data[key].cartItems,
            data[key].totalAmount,
            new Date(data[key].date)
          )
        )
      }

      dispatch({ type: FETCH_ORDERS, payload: loadedOrders });
    } catch (e) {
      throw e;
    }

  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const date = new Date();
      const response = await fetch(`https://shop-e7fc4.firebaseio.com/orders/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      });

      const data = await response.json();

      dispatch({
        type: ADD_ORDER,
        payload: { id: data.name, items: cartItems, amount: totalAmount, date }
      })

    } catch (e) {
      throw e;
    }
  }

}