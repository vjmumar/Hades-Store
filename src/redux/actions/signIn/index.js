import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from '../../types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const signIn = () => {
	return {
		type: SIGN_IN
	};
};

const signInSuccess = (payload) => {
	return {
		type: SIGN_IN_SUCCESS,
		payload
	};
};

const signInFailed = () => {
	return {
		type: SIGN_IN_FAILED
	};
};

export const startSignIn = (email, password, uid) => {
	return async (dispatch) => {
		dispatch(signIn());
		try {
			let start;
			if (!uid) {
				start = await signInWithEmailAndPassword(getAuth(), email, password);
				localStorage.setItem('firebaseId', start.user.uid);
				toast.success('Sign In Sucess');
			} else {
				localStorage.setItem('firebaseId', uid);
			}
			dispatch(signInSuccess());
		} catch (err) {
			dispatch(signInFailed());
			toast.error('Sign In Failed Wrong Email/Password');
		}
	};
};
