import { Stack } from '@chakra-ui/react';
import React from 'react';
import BackButton from '../BackButton';
import Header from '../Header';
import OrderTable from './OrderTable';

const OrderBody = () => {
	return (
		<Stack w={'100%'}>
			<Header />
			<BackButton />
			<OrderTable />
		</Stack>
	);
};

export default OrderBody;
