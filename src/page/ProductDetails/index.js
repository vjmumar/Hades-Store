import Header from '../../components/Header/index';
import { VStack } from '@chakra-ui/react';
import React from 'react';
import ProductDetailsBody from '../../components/ProductDetails';
import { ProductDetailsProvider } from './context';
import Footer from '../../components/Footer';

const ProductDetails = () => {
	return (
		<VStack w="100%" p={{ base: '15px' }}>
			<ProductDetailsProvider>
				<Header />
				<ProductDetailsBody />
				<Footer />
			</ProductDetailsProvider>
		</VStack>
	);
};

export default ProductDetails;
