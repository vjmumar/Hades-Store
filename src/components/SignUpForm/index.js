/* eslint-disable no-restricted-globals */
import React,{useContext} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Heading, Flex, Icon, Text, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link,useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { schema } from '../../page/SignUp/yupSchema';
import { SignUpContext } from '../../page/SignUp/context';
import useComponentDidMount from '../../hooks/useComponentDidMount';

const SignUpForm = () => {
    let navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});
    const {authUser, isLoading, isSignUp}  = useContext(SignUpContext);

	const onSubmit = (data) =>  {
        authUser(data);
		console.log(isLoading)
    };

    useComponentDidMount(() => {
        isSignUp && navigate("/")
    });

	return (	
			<Flex
				minH={'400px'}
				minW={'350px'}
				padding={"20px 0"}
				border={'1px solid #e2e8f0'}
				flexDirection={'column'}
				alignItems={'center'}
				borderRadius={'20px'}
				justifyContent={'center'}
				boxShadow={'-1px -2px 9px 1px #93939321'}
			>
				<Heading fontWeight={'300'} marginBottom={'15px'}>
					Sign Up
				</Heading>
				<form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
					<Flex flexDirection={'column'} alignItems={'center'}>
						<Input
							{...register('email')}
							name={'email'}
							w={'90%'}
							marginBottom={'10px'}
							type={'text'}
							placeholder={'Email'}
                            borderColor={errors?.email?.message && "red"}
						/>
                        <Text fontSize={"15px"} color={"red"} margin={"5px 0px"}>{errors?.email?.message}</Text>
						<Input
							{...register('firstName')}
							name={'firstName'}
							w={'90%'}
							marginBottom={'10px'}
							type={'text'}
							placeholder={'First Name'}
                            borderColor={errors?.firstName?.message && "red"}
						/>
                        <Text fontSize={"15px"} color={"red"} margin={"5px 0px"}>{errors?.firstName?.message}</Text>
						<Input
							{...register('lastName')}
							name={'lastName'}
							w={'90%'}
							marginBottom={'10px'}
							type={'text'}
							placeholder={'Last Name'}
                            borderColor={errors?.firstName?.message && "red"}
						/>
                        <Text fontSize={"15px"} color={"red"} margin={"5px 0px"}>{errors?.lastName?.message}</Text>
						<Input
							{...register('password')}
							name={'password'}
							w={'90%'}
							marginBottom={'10px'}
							type={'password'}
							placeholder={'Password'}
                            borderColor={errors?.password?.message && "red"}
						/>
                          <Text  fontSize={"15px"} color={"red"} margin={"5px 0px"}>{errors?.password?.message}</Text>
						<Button isLoading={isLoading}  bg={'#3F89F6'} color={'white'} w={'90%'} type={'submit'}>
							Sign Up
						</Button>
					</Flex>
				</form>
				<Stack marginTop={'10px'}>
					<Link to={'/signIn'}>
						<Flex alignItems={'center'}>
							<Icon color={'#3F89F6'} as={ArrowBackIcon} />
							<Text color={'#3F89F6'} margin={'0 5px'}>
								Already Have Account? Sign Up
							</Text>
						</Flex>
					</Link>
				</Stack>
			</Flex>
	);
};

export default SignUpForm;
