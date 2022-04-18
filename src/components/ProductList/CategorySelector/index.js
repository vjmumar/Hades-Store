import React, { useContext } from 'react';
import { Select } from '@chakra-ui/react';
import { HomeContext } from '../../../page/Home/context';
import styled from 'styled-components';

const StyledOption = styled.option`text-transform: capitalize;`;

const ProductCategorySelect = () => {
	const { categories, onFilterProductsByCategory, selectRef } = useContext(HomeContext);

	const handleChange = ({ target: { value } }) => {
		onFilterProductsByCategory(value);
	};

	return (
		<Select
			minW={{ base: '45%', lg: '250px' }}
			m={{ base: '5px', lg: '0 10px 0 0' }}
			textTransform={'capitalize'}
			ref={selectRef}
			background={'white'}
			onChange={handleChange}
			maxWidth={{ base: '100%', lg: '30%' }}
			marginBottom={'10px'}
			placeholder="Select Category"
		>
			{categories.map((category) => <StyledOption value={category}>{category}</StyledOption>)}
		</Select>
	);
};

export default ProductCategorySelect;
