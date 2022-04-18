import { Stack } from '@chakra-ui/react';
import React from 'react';
import ImageSlider from '../ImageSlider';
import { imagesArray } from './ImagesArray';

const Hero = () => {
	return (
		<Stack w={{ base: '90%', lg: '100%' }} marginBottom={'30px !important'}>
			<ImageSlider
				images={imagesArray}
				settings={{
					speed: 500,
					autoplay: true,
					autoplaySpeed: 2000,
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: true
				}}
			/>
		</Stack>
	);
};

export default Hero;
