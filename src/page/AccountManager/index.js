import React from 'react';
import { Stack } from '@chakra-ui/react';
import AccountManagerBody from '../../components/AccountManager';
import { AccountManagerProvider } from './context';

const AccountManager = () => {
	return (
		<Stack w={'100%'} p={{ base: '15px 0px', lg: '15px' }}>
			<AccountManagerProvider>
				<AccountManagerBody />
			</AccountManagerProvider>
		</Stack>
	);
};

export default AccountManager;
