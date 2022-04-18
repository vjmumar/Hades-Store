/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Flex, Heading, Image, Stack, VStack } from '@chakra-ui/react';
import Search from './Search/search';
import CartImage from '../../assets/cart.gif';
import { Link, useLocation } from 'react-router-dom';
import useComponentShouldUpdate from '../../hooks/useComponentShouldUpdate';
import UserLogo from '../../assets/user.png';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { updateCart } from '../../redux/actions/setAndGetCartProducts';
import { GET_CART } from '../../page/Cart/const';

const Header = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cartItems);
	const [ prevLocations, setPrevLocations ] = useState([]);
	const location = useLocation();
	const [ isHiddenDropdown, setHiddenDropdown ] = useState(true);

	const handleToggleDropDown = () => {
		setHiddenDropdown(!isHiddenDropdown);
	};

	useComponentDidMount(() => {
		dispatch(updateCart(GET_CART));
	});

	useComponentShouldUpdate(
		() => {
			//left empty so that it would re render the component
			prevLocations.reverse().length = 1;
			setPrevLocations([ ...prevLocations, location.pathname ]);
			localStorage.setItem('prevLocation', prevLocations);
		},
		[ location.pathname ]
	);

	return (
		<VStack
			zIndex={'99'}
			boxShadow={'-1px -2px 11px 1px #8080804f'}
			bg={'#FDFDFD'}
			position={'fixed'}
			top={'0'}
			w={'100%'}
			left={'0'}
			borderBottom={'1px solid #E2E8F0'}
			p={'0 15px'}
		>
			<Flex
				w={'100%'}
				maxWidth={'1200px'}
				pt={'20px'}
				pb={'20px'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Stack>
					<Heading as={'h6'} fontSize={{ base: '20px', lg: '30px' }}>
						Logo
					</Heading>
				</Stack>
				<Flex
					h={'100%'}
					justifyContent={'flex-end'}
					w={{ base: '100%', lg: 'fit-content' }}
					alignItems={'center'}
				>
					<Stack m={'0px 15px'}>{location.pathname === '/' && <Search />}</Stack>
					<Stack m={'0 5px'}>
						<Stack position={'relative'}>
							<Image
								onClick={handleToggleDropDown}
								cursor={'pointer'}
								w={'30px'}
								h={'30px'}
								src={UserLogo}
							/>
							<DropDown isHidden={isHiddenDropdown} />
						</Stack>
					</Stack>
					<Stack>
						<Link to={'/cart'}>
							<Stack position={'relative'}>
								<Image cursor={'pointer'} w={'30px'} h={'30px'} src={CartImage} />
								<Flex
									position={'absolute'}
									top={'-18px'}
									right={'-12px'}
									justifyContent={'center'}
									alignItems={'center'}
									fontSize={'13px'}
									w={'18px'}
									h={'18px'}
									bg={'black'}
									color={'white'}
									borderRadius={'50%'}
								>
									{cartItems.length}
								</Flex>
							</Stack>
						</Link>
					</Stack>
				</Flex>
			</Flex>
		</VStack>
	);
};

export default React.memo(Header);
