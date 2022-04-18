import React, { useContext, useState } from 'react';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { CartContext } from '../../../page/Cart/context';
import { ADD_QUANTITY, MINUS_QUANTITY, INPUTTED_QUANTITY } from '../../../page/Cart/const';
import useComponentDidMount from '../../../hooks/useComponentDidMount';

const QuantityInput = ({ quantity, id }) => {
	const { updateProductQuantity } = useContext(CartContext);

	const handleChange = ({ target: { value } }) => {
		updateProductQuantity(id, INPUTTED_QUANTITY, parseInt(value));
	};

	return (
		<Flex marginTop={'10px'}>
			<IconButton
				onClick={() => updateProductQuantity(id, MINUS_QUANTITY)}
				margin={' 0 5px'}
				icon={<MinusIcon fontSize={'12px'} />}
			/>
			<Input onChange={handleChange} textAlign={'center'} value={quantity} type={'number'} />
			<IconButton
				onClick={() => updateProductQuantity(id, ADD_QUANTITY)}
				margin={' 0 5px'}
				icon={<AddIcon fontSize={'12px'} />}
			/>
		</Flex>
	);
};

export default QuantityInput;
