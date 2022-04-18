import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from '../../types/index';

export const getProducts = () => {
	return {
		type: GET_PRODUCTS
	};
};

export const getProductsSuccess = (payload) => {
	return {
		type: GET_PRODUCTS_SUCCESS,
		payload
	};
};

export const getProductsFail = () => {
	return {
		type: GET_PRODUCTS_FAIL
	};
};

export const fetchProducts = (limit = 20) => {
	return async (dispatch) => {
		dispatch(getProducts());
		try {
			const fetchApi = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
			const result = await fetchApi.json();
			dispatch(getProductsSuccess(result));
		} catch (err) {
			dispatch(getProductsFail);
		}
	};
};
