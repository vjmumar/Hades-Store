import React, { useContext, useState } from 'react';
import { Flex, Heading, Image, Stack, Text, Button } from '@chakra-ui/react';
import { ProductDetailsContext } from '../../page/ProductDetails/context';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import RingLoader from '../../../src/assets/ringloader.gif'
import { useSelector } from 'react-redux';
import BackButton from '../BackButton';

const ProductDetailsBody = () => {
	
	const [buttonLoading,setButtonLoading] = useState(false);
	const {isSignIn} = useSelector(state => state.signIn);
	const { selectedProduct, isLoading,isSelectedProductEmpty, pushItemToCart } = useContext(ProductDetailsContext);

	const handlePushItemToCart = () => {
		pushItemToCart();
		setButtonLoading(true)
	}

	return (
       <Stack minWidth={"100%"}>
          <BackButton />
		<Flex
		    minWidth={"100%"}
			minHeight={'500px'}
			background={'white'}
			border={'1.3px solid #e2e8f0'}
			p={'25px 20px'}
			alignItems={'center'}
			flexDirection={{base: 'column', lg: 'row'}}
			justifyContent={'space-between'}
			marginTop={'30px'}
			borderRadius={'10px'}
		>
			{
				!isLoading && !isSelectedProductEmpty ? 
				<>
				<Stack w={{base: '100%',lg: '55%', }} m={{base: '0', lg: '0 30px'}}>
				<Stack m={{base: 'auto'}} backgroundSize={"100% 100%"} w={{base: '200px', lg: "300px"}} height={{base: '200px', lg: "300px"}}  backgroundImage={`url(${selectedProduct()?.image})`} />
			    </Stack>
			    <Stack m={{base: '0px', lg: '30px'}}>
			    	<Heading fontSize={{base: '20px',lg: '30px'}} marginTop={{base: '11px'}}>{selectedProduct()?.title}</Heading>
			    	<Text>{selectedProduct()?.description}</Text>
                    <Text>Rating: {selectedProduct()?.rating?.rate}</Text>
			    	<Text fontSize={{base: '20px',lg: '30px'}}>${selectedProduct()?.price}</Text>
				  <Link to={!isSignIn && '/signIn'}>
				  <Button isLoading={buttonLoading} onClick = {handlePushItemToCart} w={{base: '100%',lg:"30%"}} p={"25px 40px"} marginTop={"10px"}>
					  Add To Cart
                    <ArrowForwardIcon marginBottom={"-4.5px"} marginLeft={"5px"} fontSize={"20px"} />
                   </Button>
				  </Link>
			    </Stack>
				</>
				: !isLoading && isSelectedProductEmpty 
				? 
				<Heading margin="auto">Product is Not Found</Heading>
				:
			   	<Image m={"auto"} src = {RingLoader} />
			}
		</Flex>
       </Stack>
	);
};

export default ProductDetailsBody;
