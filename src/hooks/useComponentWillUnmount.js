import React, { useEffect } from 'react';

const useComponentWillUnmount = (cb) => {
	useEffect(() => {
		return () => {
			cb();
		};
	}, []);
};

export default useComponentWillUnmount;
