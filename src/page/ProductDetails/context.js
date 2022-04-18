import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import useComponentShouldUpdate from '../../hooks/useComponentShouldUpdate';
import { fetchProducts } from '../../redux/actions/fetchProducts';
import { updateCart } from '../../redux/actions/setAndGetCartProducts';
import { SET_CART } from '../Cart/const';

export const ProductDetailsContext = createContext({});

export const ProductDetailsProvider = ({ children }) => {
	const firebaseId = localStorage.getItem('firebaseId');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { productId } = useParams();
	const { products, isLoading } = useSelector((state) => state.getProducts);
	const [ isSelectedProductEmpty, setSelectedProductEmpty ] = useState(true);

	const selectedProduct = () => {
		return products.filter((i) => i.id === parseInt(productId))[0];
	};

	const pushItemToCart = async () => {
		const ref = await doc(db, `Users/${firebaseId}`);
		const data = await getDoc(ref);
		const cartItems = await data.data()?.cartItems || [];
		const cartItemsCopy = [ ...cartItems ];
		const { title, price, id, image } = selectedProduct();
		const findFromCart = cartItems.find((i) => i.id === id);
		const cartItemObj = {
			title,
			image,
			price,
			id,
			quantity: 1
		};

		if (findFromCart !== undefined) {
			const index = cartItemsCopy.findIndex((i) => i.id === id);
			cartItemsCopy[index].quantity = findFromCart.quantity += 1;
		} else {
			cartItemsCopy.push(cartItemObj);
		}
		await dispatch(updateCart(SET_CART, cartItemsCopy));
		navigate('/cart');
	};

	useComponentDidMount(() => {
		dispatch(fetchProducts(20));
	});

	useComponentShouldUpdate(
		() => {
			setSelectedProductEmpty(Object.keys(selectedProduct() || {}).length === 0);
		},
		[ products ]
	);

	return (
		<ProductDetailsContext.Provider
			value={{ selectedProduct, isLoading, products, isSelectedProductEmpty, pushItemToCart }}
		>
			{children}
		</ProductDetailsContext.Provider>
	);
};
