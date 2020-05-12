import { ADD_ORDER, FETCH_ORDERS } from '../types';
import Order from '../../models/Order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        orders: action.payload
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
    default:
      return state;
  }
};