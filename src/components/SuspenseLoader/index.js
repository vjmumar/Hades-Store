import { Stack, Image } from '@chakra-ui/react';
import RingLoader from '../../assets/ringloader.gif';
import React from 'react';

const SuspenseLoader = () => {
	return (
		<Stack w={'100vw'} h={'100vh'}>
			<Image m={'auto'} src={RingLoader} />
		</Stack>
	);
};

export default SuspenseLoader;
