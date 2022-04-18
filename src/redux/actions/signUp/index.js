/* eslint-disable no-restricted-globals */
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../../types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const signUp = () => {
	return {
		type: SIGN_UP
	};
};

const signUpSuccess = (payload) => {
	return {
		type: SIGN_UP_SUCCESS,
		payload
	};
};

const signUpFailed = () => {
	return {
		type: SIGN_UP_FAILED
	};
};

export const startSignUp = (data) => {
	return async (dispatch) => {
		dispatch(signUp());
		try {
			const start = await createUserWithEmailAndPassword(getAuth(), data.email, data.password);
			const ref = doc(db, 'Users', start.user.uid);
			await setDoc(ref, {
				firstName: data.firstName,
				lastName: data.lastName,
				address: '',
				cartItems: []
			});
			dispatch(signUpSuccess(start));
			localStorage.setItem('firebaseId', start.user.uid);
			toast.success('Sign Up Sucess');
			location.href = '/';
		} catch (err) {
			dispatch(signUpFailed());
			toast.error('Sign Up Failed Email Is Taken');
		}
	};
};
