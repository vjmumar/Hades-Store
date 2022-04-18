const minimizeTextLength = (text = '', length = 19) => {
	return text.length >= length ? text.slice(0, length) + '...' : text;
};

export default minimizeTextLength;
