import * as yup from 'yup';

export const schema = yup
	.object()
	.shape({
		email: yup.string().email().required('Please Fill In The Email'),
		password: yup.string().required('Please Fill In The Password')
	})
	.required();
