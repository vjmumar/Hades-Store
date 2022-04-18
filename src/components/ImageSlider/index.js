import { Image } from '@chakra-ui/react';
import React from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ settings, images }) => {
	return (
		<Slider {...settings}>
			{images.map((i, index) => <Image key={index} src={i} maxH={'450px'} h={'100%'} objectFit={'cover'} />)}
		</Slider>
	);
};

export default ImageSlider;
