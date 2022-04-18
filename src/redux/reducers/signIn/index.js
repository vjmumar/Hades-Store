import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from '../../types';

const initialState = {
	isLoading: false,
	isSignIn: false,
	userData: []
};

export const signInReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isLoading: true,
				isSignIn: false
			};
		case SIGN_IN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isSignIn: true,
				userData: action.payload
			};
		case SIGN_IN_FAILED:
			return {
				isLoading: false,
				isSignIn: false,
				userData: []
			};
		default:
			return state;
	}
};
