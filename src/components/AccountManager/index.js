import { Stack } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header';
import AccountManagerForm from './Form';

const AccountManagerBody = () => {
	return (
		<Stack>
			<Header />
			<AccountManagerForm />
		</Stack>
	);
};

export default AccountManagerBody;
