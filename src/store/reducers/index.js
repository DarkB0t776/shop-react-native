import { combineReducers } from 'redux';
import productsReducer from './products';
import cartReducer from './cart';
import ordersReducer from './orders';
import authReducer from './auth';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

export default rootReducer;