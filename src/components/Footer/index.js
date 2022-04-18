import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Footer = () => {
	return (
		<Flex justifyContent={'center'} background={'white'} padding={'20px'} w={'100%'}>
			<Heading textAlign={'center'} fontSize={'15px'} fontWeight={'300'}>
				All rights reserved
			</Heading>
		</Flex>
	);
};

export default Footer;
