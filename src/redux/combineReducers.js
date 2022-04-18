import { getAndSetCartItemsReducer } from './reducers/setAndGetCartProducts';
import { getProductReducer } from './reducers/fetchProducts/index';
import { setAndGetOrderReducer } from './reducers/setAndGetOrder';
import { signUpReducer } from './reducers/signUp';
import { signInReducer } from './reducers/signIn';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
	getProducts: getProductReducer,
	cartItems: getAndSetCartItemsReducer,
	signIn: signInReducer,
	signUp: signUpReducer,
	order: setAndGetOrderReducer
});
