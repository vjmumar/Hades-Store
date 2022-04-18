import React, { createContext, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import useComponentShouldUpdate from '../../hooks/useComponentShouldUpdate';
import { fetchProducts } from '../../redux/actions/fetchProducts/index';

export const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
	const { isLoading, products } = useSelector((state) => state.getProducts);
	const [ isFiltered, setIsFiltered ] = useState(false);
	const [ filteredProducts, setFilteredProducts ] = useState([]);
	const [ paginatedProducts, setPaginatedProducts ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ productDetails, setProductDetails ] = useState({});
	const dispatch = useDispatch();
	//ref
	const selectRef = useRef(null);

	const getAllCategory = () => {
		const categoriesCopy = [ ...categories ];
		products.map(({ category }) => {
			if (!categoriesCopy.includes(category)) {
				categoriesCopy.push(category);
				setCategories(categoriesCopy);
			}
		});
	};

	const updateSelectFromUi = (index = 0) => {
		selectRef.current.selectedIndex = index;
	};

	const onFetchProducts = (limit = 20) => {
		dispatch(fetchProducts(limit));
	};

	const onPaginateProducts = (pageNumber, perPage = 4) => {
		const copyPaginate = (isFiltered ? filteredProducts : products).slice(
			(pageNumber - 1) * perPage,
			perPage * pageNumber
		);
		setPaginatedProducts(copyPaginate);
	};

	const onFilterProducts = (value = '') => {
		setIsFiltered(true);
		const copyFiltered = products.filter(({ title }) => title.toLowerCase().includes(value));
		setPaginatedProducts(copyFiltered);
		setFilteredProducts(copyFiltered);
		updateSelectFromUi();
	};

	const onFilterProductsByCategory = (value = '') => {
		setIsFiltered(true);
		const copyFiltered = products.filter(
			({ category }) => category.toLowerCase() === `${value.toLocaleLowerCase()}`
		);
		const filtered = !value ? products : copyFiltered;
		setFilteredProducts(filtered);
	};

	const onSortProducts = (value = '') => {
		setIsFiltered(true);
		const sortedProducts = (isFiltered ? filteredProducts : products).sort((a, b) => {
			return value === 'high' ? b.price - a.price : a.price - b.price;
		});
		setFilteredProducts(sortedProducts);
		setPaginatedProducts(sortedProducts);
		onPaginateProducts(1);
	};

	useComponentDidMount(() => {
		onFetchProducts(20);
	});

	useComponentShouldUpdate(
		() => {
			onPaginateProducts(1);
			getAllCategory();
		},
		[ products, filteredProducts ]
	);

	return (
		<HomeContext.Provider
			value={{
				isLoading,
				products,
				paginatedProducts,
				onFetchProducts,
				onPaginateProducts,
				onFilterProducts,
				isFiltered,
				filteredProducts,
				categories,
				onFilterProductsByCategory,
				selectRef,
				productDetails,
				setProductDetails,
				onSortProducts
			}}
		>
			{children}
		</HomeContext.Provider>
	);
};
