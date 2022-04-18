import { Stack } from '@chakra-ui/react';
import React from 'react';
import CartBody from '../../components/Cart';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { CartContextProvider } from './context';

const Cart = () => {
	return (
		<Stack w={'100%'} p={{ base: '15px' }}>
			<Header />
			<CartContextProvider>
				<CartBody />
				<Footer />
			</CartContextProvider>
		</Stack>
	);
};

export default Cart;
