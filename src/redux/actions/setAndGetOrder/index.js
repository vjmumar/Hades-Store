import { END_ORDER_LOADING, GET_ORDER, START_ORDER_LOADING } from '../../types';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { GET_ORDER_TYPE, SET_ORDER_TYPE } from '../../../page/Order/const';
import { toast } from 'react-toastify';

const startOrderLoading = () => {
	return {
		type: START_ORDER_LOADING
	};
};

const getOrder = (payload) => {
	return {
		type: GET_ORDER,
		payload
	};
};

const endOrderLoading = () => {
	return {
		type: END_ORDER_LOADING
	};
};

export const updateOrderAction = (type, order) => {
	return async (dispatch) => {
		dispatch(startOrderLoading());
		const id = localStorage.getItem('firebaseId');
		const userDocRef = doc(db, `Users/${id}`);
		const ordersDocRef = doc(db, 'OrderList/OrderListDoc');
		const user = await getDoc(userDocRef);
		const orders = await getDoc(ordersDocRef);
		const userDataOrders = user.data().orders || [];
		const ordersDataOrders = orders.data().orders || [];
		if (type === SET_ORDER_TYPE) {
			order.forEach((e) => userDataOrders.push(e.id));
			await updateDoc(ordersDocRef, { orders: [ ...ordersDataOrders, ...order ] });
			await updateDoc(userDocRef, { orders: userDataOrders });
			toast.success('Order Success');
		} else if (type === GET_ORDER_TYPE) {
			const filtered = ordersDataOrders.filter((e) => userDataOrders.find((i) => e.id === i));
			dispatch(getOrder(filtered));
		}
		dispatch(endOrderLoading());
	};
};
