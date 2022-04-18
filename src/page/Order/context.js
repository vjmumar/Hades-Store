import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { updateOrderAction } from '../../redux/actions/setAndGetOrder';
import { GET_ORDER_TYPE } from './const';

export const OrderContext = createContext({});

export const OrderContextProvider = ({ children }) => {
	const dispatch = useDispatch();
	const { orders, isLoading } = useSelector((state) => state.order);

	useComponentDidMount(async () => {
		await dispatch(updateOrderAction(GET_ORDER_TYPE));
	});

	return <OrderContext.Provider value={{ orders, isLoading }}>{children}</OrderContext.Provider>;
};
