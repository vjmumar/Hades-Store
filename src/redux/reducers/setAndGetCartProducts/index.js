import { UPDATE_CART_ITEMS, START_CART_LOADING, END_CART_LOADING, GET_CART_ITEMS } from '../../types';

const initialState = {
	isLoading: false,
	cartItems: []
};

export const getAndSetCartItemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_CART_LOADING:
			return {
				...state,
				isLoading: true
			};
		case GET_CART_ITEMS:
			return {
				...state,
				cartItems: action.payload
			};
		case UPDATE_CART_ITEMS:
			return {
				...state,
				cartItems: action.payload
			};
		case END_CART_LOADING:
			return {
				...state,
				isLoading: false
			};
		default:
			return state;
	}
};
