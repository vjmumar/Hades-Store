import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from '../../types';

const initialState = {
	isLoading: false,
	products: []
};

export const getProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return { ...state, isLoading: true };
		case GET_PRODUCTS_SUCCESS:
			return { ...state, products: action.payload, isLoading: false };
		case GET_PRODUCTS_FAIL:
			return { ...state, isLoading: true };
		default:
			return state;
	}
};
