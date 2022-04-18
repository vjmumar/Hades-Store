import { Stack, Text, Flex, Divider, Button } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { CartContext } from '../../../page/Cart/context';
import uniqid from 'uniqid';

const OrderSummary = () => {
	const { cartItems,updateOrder } = useContext(CartContext);
	const [checkoutItems,setCheckoutItems] = useState([]);
	const checkedItems = cartItems.filter(e => e.isChecked === true);
	const shippingFee = checkedItems.length <= 0 ? 0 : 50;
    const subTotal = checkedItems.reduce((a,c) => c.price * c.quantity + a, 0).toFixed(2);
    const total = checkedItems.reduce((a,c) => c.price * c.quantity + a, shippingFee).toFixed(2);

	const handleCheckout = () => {
	const checkedItemsCopy = [...checkedItems];
	const checkoutItemsCopy = [...checkoutItems];
    checkedItemsCopy.forEach(e => {	
	const obj = {
		image: e.image,
		price: e.price,
		quantity: e.quantity,
		title: e.title,
		total: (e.price * e.quantity + 50).toFixed(2),
        id: uniqid("Items-")
	}
    checkoutItemsCopy.push(obj);
	});
	
	if (checkedItemsCopy.length) {
    setCheckoutItems(checkoutItemsCopy);
	updateOrder(checkoutItemsCopy);
	}

	}

	return (
		<Stack>
			<Text marginBottom={'10px'}>Order Summary</Text>
			<Flex justifyContent={'space-between'}>
				<Text>Subtotal ({checkedItems?.length} items)</Text>
				<Text>${subTotal}</Text>
			</Flex>
			<Divider />
			<Flex justifyContent={'space-between'}>
				<Text>Shipping Fee</Text>
				<Text>$50</Text>
			</Flex>
			<Divider />
			<Flex justifyContent={'space-between'}>
				<Text>Subtotal</Text>
				<Text>${(total)}</Text>
			</Flex>
			<Button onClick={handleCheckout}>Proceed To Checkout({checkedItems.length})</Button>
		</Stack>
	);
};

export default OrderSummary;
