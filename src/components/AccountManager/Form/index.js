import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack, Input, Heading, Image,Text,IconButton } from '@chakra-ui/react';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import { AccountManagerContext } from '../../../page/AccountManager/context';
import RingLoader from '../../../assets/ringloader.gif'
import { toast } from 'react-toastify';
import { ArrowBackIcon} from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import useComponentShouldUpdate from '../../../hooks/useComponentShouldUpdate';
import styled from 'styled-components';
import BackButton from '../../BackButton';

const AccountManagerForm = () => {
	const { userData, isLoading, setNewUserDetails, handleChangeImage } = useContext(AccountManagerContext);
	const [userImageUrl,setImageUrl] = useState('')

	const { register, handleSubmit,setValue } = useForm();

	const updateDetails = () => {
		setImageUrl(userData.imageUrl || 'https://i.pinimg.com/474x/ab/36/bb/ab36bbdac37227ebe06136d900eb87b7.jpg');
		const registeredInputs = ['firstName','lastName','address'];
		Object.keys(userData).forEach((keys) => {
			if (registeredInputs.includes(keys)) {
				setValue(keys,userData[keys])
			}
		})
	}

	const handleUpdateDetails = (data) => {
		const newPass = data.newPassword.replace(/ /g, '');
		const confirmPass = data.confirmPassword.replace(/ /g, '');
     if (newPass.length !== 0) {
		newPass !== confirmPass ? toast.error("New Password And Confirm Password Not The Same") :  setNewUserDetails(data);
	 } else {
        setNewUserDetails(data);
	 }
	}

	const StyledDiv = styled.div`
     margin: 20px auto;
     position: relative;
     width: 250px;
     height: 250px;
     border: 1.5px solid #E2E8F0;
     border-Radius: 50%;
     background-size: cover;
     background-image: url(${userImageUrl});

	 @media(max-width: 768px) {
		 width: 170px;
		 height: 170px;
	 }

	&:after {
		content: 'Change Image';
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #0000006e;
		position: absolute;
		border-Radius: 50%;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 22px;
		display: none;
	}
	&:hover:after{
		display: flex;
	}
     `;

	useComponentDidMount(() => {
		updateDetails();
	});

	useComponentShouldUpdate(() => {
		updateDetails();
	},[userData])


	return (
		<Stack
		w={'90%'}
		margin={'0 auto !important'}
		d={'block'}
		>
		<BackButton />
			<Stack
			borderRadius={'10px'}
			border={'1px solid #E2E8F0'}
			p={'20px'}
		>
			{
				!isLoading ? 
				<> 
				<Heading fontSize={{base: '25px', lg: '30px'}} textAlign={'center'}>Account Manager</Heading>
			    <form onSubmit={handleSubmit(handleUpdateDetails)}>
				   <StyledDiv>
						<Input
						opacity={"0"}
						position={"absolute"}
						w={"100%"}
						onInput={handleChangeImage}
						{...register("userImage")}
						h={"100%"}
						cursor={"pointer"}
						zIndex={"9999"}
						type="file" />
					</StyledDiv>
					<Text>First Name</Text>
			    	<Input  {...register('firstName')} margin={'10px 0px'} name={'firstName'} placeholder={'First Name'} />
					<Text>Last Name</Text>
			    	<Input {...register('lastName')} margin={'10px 0px'} name={'lastName'} placeholder={'Last Name'} />
					<Text>Address</Text>
			    	<Input {...register('address')} margin={'10px 0px'} name={'address'} placeholder={'Address'} />
					<Text>New Password</Text>
			    	<Input margin={'10px 0px'} {...register("newPassword")}  name={'newPassword'} placeholder={'Password'} />
					<Text>Confirm Password</Text>
			    	<Input margin={'10px 0px'} {...register('confirmPassword')} name={'confirmPassword'} placeholder={'Confirm Password'} />
			    	<Button w={{base: '100%', lg: '30%'}} type={"submit"} isLoading={isLoading}>Update</Button>
			    </form>
				</>
				:
				<Image src={RingLoader} margin={"auto"} />
			}
		</Stack>
		</Stack>
	);
};

export default AccountManagerForm;
