import { END_ORDER_LOADING, GET_ORDER, START_ORDER_LOADING } from '../../types';

const initialState = {
	isLoading: false,
	orders: []
};

export const setAndGetOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_ORDER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case GET_ORDER:
			return {
				...state,
				orders: action.payload
			};
		case END_ORDER_LOADING:
			return {
				...state,
				isLoading: false
			};
		default:
			return state;
	}
};
