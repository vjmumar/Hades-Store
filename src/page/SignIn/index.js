/* eslint-disable no-restricted-globals */
import React from 'react';
import { Flex } from '@chakra-ui/react';
import SignInForm from '../../components/SignInForm';
import { SignInContextProvider } from './context';

const SignIn = () => {
	return (
		<Flex minH={'90vh'} justifyContent={'center'} alignItems={'center'}>
			<SignInContextProvider>
				<SignInForm />
			</SignInContextProvider>
		</Flex>
	);
};

export default SignIn;
