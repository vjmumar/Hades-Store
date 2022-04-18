import React from 'react';
import { VStack } from '@chakra-ui/react';
import Hero from '../../components/Hero';
import ProductList from '../../components/ProductList';
import { HomeContextProvider } from './context';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Home = () => {
	return (
		<VStack w={'100%'}>
			<HomeContextProvider>
				<Header />
				<Hero />
				<ProductList />
				<Footer />
			</HomeContextProvider>
		</VStack>
	);
};

export default Home;
