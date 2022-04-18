import React, { lazy, Suspense } from 'react';
import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
//Slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

//Others
import Toast from './components/Toast';
import SuspenseLoader from './components/SuspenseLoader/index';

const Home = lazy(() => import('./page/Home'));
const SignIn = lazy(() => import('./page/SignIn'));
const SignUp = lazy(() => import('./page/SignUp'));
const Cart = lazy(() => import('./page/Cart'));
const AccountManager = lazy(() => import('./page/AccountManager'));
const ProductDetails = lazy(() => import('./page/ProductDetails'));
const Order = lazy(() => import('./page/Order'));

function App() {
	return (
		<VStack>
			<VStack
				margin={'81px auto 0'}
				maxWidth={{ base: '480px', md: '768', lg: '1200px' }}
				w={'100%'}
				className="App"
			>
				<Toast />
				<Suspense fallback={<SuspenseLoader />}>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/product-details/:productId" element={<ProductDetails />} />
						<Route exact path="/cart" element={<Cart />} />
						<Route exact path={'/signIn'} element={<SignIn />} />
						<Route exact path={'/signUp'} element={<SignUp />} />
						<Route exact path={'/account'} element={<AccountManager />} />
						<Route exact path={'/orders'} element={<Order />} />
						<Route path={'*'} element={'404 Page Not Found'} />
					</Routes>
				</Suspense>
			</VStack>
		</VStack>
	);
}

export default App;
