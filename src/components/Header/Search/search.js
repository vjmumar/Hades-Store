import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { HomeContext } from '../../../page/Home/context';

const StyleForm = styled.form`
	display: flex;
	position: relative;
	align-items: center;
	min-width: 300px;

	@media (max-width: 500px) {
		min-width: 100% !important;
	}
`;

const Search = () => {
	const { register, handleSubmit } = useForm();
	const { onFilterProducts } = useContext(HomeContext);

	const onSubmit = (val) => {
		onFilterProducts(val.search);
	};

	return (
		<Flex alignItems={'center'} h={'100%'}>
			<StyleForm onSubmit={handleSubmit(onSubmit)}>
				<Input
					fontSize={{ base: '10px', lg: '15px' }}
					backgroundColor={'white'}
					placeholder={'Search Products Here'}
					{...register('search', { required: true })}
					name="search"
				/>
				<IconButton
					_hover={'background: transparent'}
					bg={'transparent'}
					position={'absolute'}
					right={'0'}
					borderRadius={'0'}
					h={'28px'}
					type="submit"
					aria-label="Search database"
					icon={<SearchIcon />}
					zIndex={'99999'}
				/>
			</StyleForm>
		</Flex>
	);
};

export default Search;
