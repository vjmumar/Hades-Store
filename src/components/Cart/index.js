import React, { useContext, lazy, Suspense } from 'react';
import { Stack, Flex, Box, Image } from '@chakra-ui/react';
import OrderSummary from './OrderSummary';
import RingLoader from '../../../src/assets/ringloader.gif';
import { CartContext } from '../../page/Cart/context';
import BackButton from '../BackButton';

//lazy
const CartItems = lazy(() => import('./CartItems/index'));

const CartBody = () => {
	const { isLoading } = useContext(CartContext);
	return (
		<Stack>
			<BackButton />
			<Flex justifyContent={'space-between'} flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex
					maxHeight={'100vh'}
					overflowY={'scroll'}
					p={{ base: '15px', lg: '30px' }}
					border={'1px solid #E2E8F0'}
					borderRadius={'10px'}
					justifyContent={'space-around'}
					w={{ base: '100%', lg: '70%' }}
					flexWrap={'wrap'}
					marginBottom={{ base: '15px', lg: '0' }}
					css={{
						'&::-webkit-scrollbar': {
							width: '4px'
						},
						'&::-webkit-scrollbar-track': {
							width: '6px'
						},
						'&::-webkit-scrollbar-thumb': {
							background: '#EDF2F7',
							borderRadius: '24px'
						}
					}}
				>
					{isLoading ? (
						<Image src={RingLoader} />
					) : (
						<Suspense fallback={<Image src={RingLoader} />}>
							<CartItems />
						</Suspense>
					)}
				</Flex>
				<Box
					position={'sticky'}
					top={'0'}
					h={'fit-content'}
					p={{ base: '15px', lg: '30px' }}
					border={'1px solid #E2E8F0'}
					borderRadius={'10px'}
					marginLeft={{ base: '0px', lg: '4%' }}
					w={{ base: '100%', lg: '36%' }}
				>
					<OrderSummary />
				</Box>
			</Flex>
		</Stack>
	);
};

export default CartBody;
