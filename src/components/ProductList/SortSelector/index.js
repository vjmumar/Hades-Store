import React, { useContext } from 'react';
import { Select } from '@chakra-ui/react';
import { HomeContext } from '../../../page/Home/context';
import styled from 'styled-components';

const StyledOption = styled.option`text-transform: capitalize;`;

const ProductSortSelect = () => {
	const { onSortProducts } = useContext(HomeContext);

	const handleChange = ({ target: { value } }) => {
		onSortProducts(value);
	};

	return (
		<Select
			minW={{ base: '45%', lg: '250px' }}
			m={{ base: '5px', lg: '0 10px 0 0' }}
			fontSize={{ base: '15px' }}
			textTransform={'capitalize'}
			background={'white'}
			onChange={handleChange}
			maxWidth={{ base: '100%', lg: '30%' }}
			marginBottom={'10px'}
			placeholder="Sort Price"
		>
			<StyledOption value={'cheap'}>Cheap to High</StyledOption>
			<StyledOption value={'high'}>High to Cheap</StyledOption>
		</Select>
	);
};

export default ProductSortSelect;
