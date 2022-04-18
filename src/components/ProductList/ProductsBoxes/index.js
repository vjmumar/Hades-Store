import React, { useContext } from 'react';
import { Text, Image, Stack, Heading } from '@chakra-ui/react';
import { HomeContext } from '../../../page/Home/context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import minimizeTextLength from '../../../helpers/minimizeTextLength';

const StyledBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border: 1px solid #e2e8f0 !important;
	min-width: 280px;
	max-width: 250px;
	border: 10px;
	height: 100%;
	border-radius: 5px !important;
	object-fit: cover;
	padding: 20px 10px;
	cursor: pointer;
	background-color: white;
	overflow: hidden;
	position: relative;
	&:hover .product_overlay {
		bottom: 0;
	}
	&:hover .product_image {
		filter: blur(6px);
	}
`;

const ProductBox = () => {
	const { paginatedProducts } = useContext(HomeContext);

	return paginatedProducts.map(({ title, price, id, image }) => (
		<StyledBox key={id}>
			<Image transitionDuration={'.8s'} className={'product_image'} w={'200px'} h={'200px'} src={image} />
			<Text m={'15px 0px 5px'} textAlign={'center'}>
				{minimizeTextLength(title, 19)}
			</Text>
			<Text marginTop={'auto'} m={'5px 0px'} textAlign={'center'}>
				${price}
			</Text>
			<Link to={`/product-details/${id}`}>
				<Stack
					transitionDuration={'.3s'}
					h={'100%'}
					w={'100%'}
					bg={'white'}
					opacity={'0.8'}
					position={'absolute'}
					bottom={'-100%'}
					d={'flex'}
					left={'0'}
					alignItems={'center'}
					justifyContent={'center'}
					className="product_overlay"
				>
					<Heading>Show</Heading>
				</Stack>
			</Link>
		</StyledBox>
	));
};

export default ProductBox;
