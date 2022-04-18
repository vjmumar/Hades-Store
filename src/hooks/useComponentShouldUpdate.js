import React, { useEffect } from 'react';

const useComponentShouldUpdate = (cb, dependencies) => {
	useEffect(
		() => {
			cb();
		},
		[ ...dependencies ]
	);
};

export default useComponentShouldUpdate;
