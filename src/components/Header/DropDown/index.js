import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { getAuth, signOut } from "firebase/auth";

const DropDown = ({ isHidden }) => {
	const navigate = useNavigate();
	let {isSignIn} = useSelector(state => state.signIn);
    
	const handleSignOut = async () => {
		const auth = await getAuth();
		await signOut(auth);
		if (auth.currentUser === null) {
			localStorage.setItem("firebaseId", '');
			navigate("/");
			navigate(0);
		}
	}

	return (
		<Stack
		    position={'absolute'}
		    bottom={'-100%'}
			background={'white'}
			transform={'translate(-63%,95%)'}
			p={'15px'}
			w={'175px'}
			border={'1px solid #e9e9e9'}
			display={isHidden ? 'none' : 'block'}
		>
		{
			isSignIn ? 
			<>
				<Link to={'/account'}>
				<Text
					_hover={{
						borderBottom: '1px solid'
					}}
				>
					Manage Account
				</Text>
			</Link>
			<Link to={'/orders'}>
				<Text
					_hover={{
						borderBottom: '1px solid'
					}}
				>
					My Orders
				</Text>
			</Link>
			<Text
					margin={"0 !important"}
					cursor={"pointer"}
					onClick={handleSignOut}
					_hover={{
						borderBottom: '1px solid'
					}}
				>
					Sign Out
				</Text>
			</>
			:
			<>
			<Link to={'/signIn'}>
				<Text
					_hover={{
						borderBottom: '1px solid'
					}}
				>
					Sign In
				</Text>
			</Link>
			<Link to={'/signUp'}>
				<Text
					_hover={{
						borderBottom: '1px solid'
					}}
				>
					Sign Up
				</Text>
			</Link>
			</>
		}
		</Stack>
	);
};

export default DropDown;
