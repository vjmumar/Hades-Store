import * as yup from 'yup';

export const schema = yup
	.object()
	.shape({
		email: yup.string().email().required('Please Fill In The Email'),
		firstName: yup.string().required('Please Fill In Your First Name'),
		lastName: yup.string().required('Please Fill In Your Last Name'),
		password: yup.string().required('Please Fill In The Password')
	})
	.required();
