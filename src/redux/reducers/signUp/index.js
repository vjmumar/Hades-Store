import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../../types';

const initialState = {
	isLoading: false,
	userData: []
};

export const signUpReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP:
			return {
				...state,
				isLoading: true
			};
		case SIGN_UP_SUCCESS:
			return {
				...state,
				isLoading: false,
				userData: action.payload
			};
		case SIGN_UP_FAILED:
			return {
				isLoading: false,
				userData: []
			};
		default:
			return state;
	}
};
