import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../../firebase';
import { GET_CART, SET_CART } from '../../../page/Cart/const';
import { UPDATE_CART_ITEMS, START_CART_LOADING, END_CART_LOADING, GET_CART_ITEMS } from '../../types';

const startCartLoading = () => {
	return {
		type: START_CART_LOADING
	};
};

const endCartLoading = () => {
	return {
		type: END_CART_LOADING
	};
};

const getCartItem = (payload) => {
	return {
		type: GET_CART_ITEMS,
		payload
	};
};

export const updateCartItem = (payload) => {
	return {
		type: UPDATE_CART_ITEMS,
		payload
	};
};

const getLatestCart = (ref) => {
	return async (dispatch) => {
		const data = await getDoc(ref);
		dispatch(getCartItem(data.data()?.cartItems || []));
	};
};

export const updateCart = (type, newData,noti = true) => {
	return async (dispatch) => {
		dispatch(startCartLoading());
		try {
		const id = localStorage.getItem('firebaseId');
		const ref = await doc(db, `Users/${id}`);
		if (type === GET_CART) {
			await dispatch(getLatestCart(ref));
		} else if (type === SET_CART) {
			await updateDoc(ref, { cartItems: newData });
			await dispatch(getLatestCart(ref));
			noti && toast.success('Updating Cart Success');
		}
		dispatch(endCartLoading());
		} catch(err) {
			dispatch(endCartLoading());
		}
		
	};
};
