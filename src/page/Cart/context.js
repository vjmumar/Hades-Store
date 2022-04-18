import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { updateCart } from '../../redux/actions/setAndGetCartProducts/index';
import { ADD_QUANTITY, GET_CART, INPUTTED_QUANTITY, MINUS_QUANTITY, SET_CART } from './const';
import { updateOrderAction } from '../../redux/actions/setAndGetOrder/index';
import { SET_ORDER_TYPE, GET_ORDER_TYPE } from '../Order/const';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems, isLoading } = useSelector((state) => state.cartItems);

	const updateProductQuantity = (id, type, val) => {
		const cartCopy = [ ...cartItems ];
		const findProduct = cartCopy.find((i) => i.id === id);
		if (type === ADD_QUANTITY) {
			findProduct.quantity++;
		} else if (type === MINUS_QUANTITY) {
			findProduct.quantity !== 0 && findProduct.quantity--;
		} else if (type === INPUTTED_QUANTITY) {
			findProduct.quantity = parseInt(val);
		}

		dispatch(updateCart(SET_CART, cartCopy));
	};

	const updateCheckedProducts = (isChecked, id) => {
		const cartCopy = [ ...cartItems ];
		const findIfExist = cartCopy.find((items) => items.id === id);
		findIfExist.isChecked = Object.values(isChecked)[0];
		dispatch(updateCart(SET_CART, cartCopy));
	};

	const removeProductFromCart = (id) => {
		const cartCopy = [ ...cartItems ];
		const productIndex = cartCopy.findIndex((i) => i.id === id);
		cartCopy.splice(productIndex, 1);
		dispatch(updateCart(SET_CART, cartCopy));
	};

	const removeCheckedProducts = () => {
		const filterProduct = cartItems.filter((i) => !i.isChecked);
		dispatch(updateCart(SET_CART, filterProduct, false));
	};

	const updateOrder = async (checkoutItems) => {
		await dispatch(updateOrderAction(SET_ORDER_TYPE, checkoutItems));
		removeCheckedProducts();
		navigate('/orders');
	};

	useComponentDidMount(async () => {
		await dispatch(updateCart(GET_CART));
	});

	return (
		<CartContext.Provider
			value={{
				cartItems,
				isLoading,
				updateProductQuantity,
				removeProductFromCart,
				updateCheckedProducts,
				removeCheckedProducts,
				updateOrder
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
