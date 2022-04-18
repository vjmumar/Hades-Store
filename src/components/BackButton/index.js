import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const BackButton = () => {
	return (
		<Link to={'/'}>
			<IconButton fontSize={'20px'} w={'100px'} icon={<ArrowBackIcon />} />
		</Link>
	);
};

export default BackButton;
