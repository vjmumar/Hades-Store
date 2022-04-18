/* eslint-disable no-restricted-globals */
import React from 'react';
import { Flex } from '@chakra-ui/react';
import SignUpForm from '../../components/SignUpForm/index';
import { SignUpContextProvider } from './context';

const SignUp = () => {
	return (
		<Flex minH={'90vh'} justifyContent={'center'} alignItems={'center'}>
			<SignUpContextProvider>
				<SignUpForm />
			</SignUpContextProvider>
		</Flex>
	);
};

export default SignUp;
