import React, { useContext, useState } from 'react';
import { Text, Image, Flex, IconButton, Heading } from '@chakra-ui/react';
import { CartContext } from '../../../page/Cart/context';
import minimizeTextLength from '../../../helpers/minimizeTextLength';
import QuantityInput from '../QuantityInput';
import { Link } from 'react-router-dom';
import { DeleteIcon} from '@chakra-ui/icons';
import { Checkbox } from '@chakra-ui/react'

const CartItems = () => {
	const { cartItems,removeProductFromCart, updateCheckedProducts } = useContext(CartContext);

	const handleCheckBox = ({target: {checked}}, id) => {
		updateCheckedProducts({isChecked: checked},id);
	}

	return (
		<>
			{
				cartItems.length !== 0 ? 
				cartItems.map(({ title, image, id, quantity, price,isChecked }) => (
					<Flex 
					position={"relative"}
					cursor={"pointer"}
					flexDirection={"column"} 
					alignItems={"center"} 
					borderRadius={"10px"} 
					p={"20px"} 
					marginBottom={"30px"} 
					border={"1px solid #E2E8F0"} 
					w={'300px'} 
					key={id}>
						<Checkbox 
						m={"10px"} 
						size={'lg'}
						position={"absolute"}
						top={"0"}
						left={"0"}
						defaultIsChecked={isChecked}
						onInput={(e) => handleCheckBox(e, id)}
						/>
						<IconButton w={"15%"} position={"absolute"} top={"0"} right={"0"} onClick={() => removeProductFromCart(id)} icon={<DeleteIcon />} />
						<Link to={`/product-details/${id}`}>
						<Image w={{base: '160px', lg: "200px"}} h={{base: '130px', lg: "200px"}} objectFit={"contain"}  marginBottom={"10px"}  src={image} />
						<Text textAlign={"center"}>{minimizeTextLength(title,19)}</Text>
						<Text textAlign={"center"}>${price}</Text>
						</Link>
						<QuantityInput id={id} quantity={quantity} />
					</Flex>
				))
				:
				<Heading margin={"auto"}>Cart Is Empty</Heading>
			}
		</>
	);
};

export default CartItems;
