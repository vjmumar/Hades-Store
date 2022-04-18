import React from 'react';
import OrderBody from '../../components/Order';
import { OrderContextProvider } from './context';

const Order = () => {
	return (
		<OrderContextProvider>
			<OrderBody />
		</OrderContextProvider>
	);
};

export default Order;
