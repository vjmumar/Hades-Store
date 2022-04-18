import React, { useContext } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Stack, Image } from '@chakra-ui/react';
import { OrderContext } from '../../../page/Order/context';
import minimizeTextLength from '../../../helpers/minimizeTextLength';
import RingLoader from '../../../assets/ringloader.gif';

const OrderTable = () => {
	const { isLoading, orders } = useContext(OrderContext);
	return (
		<Stack overflowX={'scroll'} border={'1px solid #e2e8f0'} p={'20px 10px'} borderRadius={'10px'} w={'100%'}>
			{isLoading ? (
				<Image w={"fit-content"} m={"auto"} h={"fit-content"} src = {RingLoader} />
			) : (
				<Table variant="striped">
					<TableCaption>Orders</TableCaption>
					<Thead>
						<Tr>
                            <Td>Image</Td>
							<Td>Title</Td>
							<Td>Total</Td>
							<Td>Id</Td>
							<Td>Quantity</Td>
							<Td>Price</Td>
                        </Tr>
					</Thead>
					<Tbody>
                        {
                        orders?.map(e => (
                        <Tr>
							<Td><Image w={"80px"} h={"80px"} objectFit={"contain"} src = {e.image} /></Td>
							<Td>{minimizeTextLength(e.title,19)}</Td>
							<Td>${e.total}</Td>
							<Td>{e.id}</Td>
							<Td>{e.quantity}</Td>
							<Td>${e.price}</Td>
						</Tr>
                            ))
                        }	
					</Tbody>
				</Table>
			)}
		</Stack>
	);
};

export default OrderTable;
