import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSignIn } from '../../redux/actions/signIn';

export const SignInContext = createContext({});

export const SignInContextProvider = ({ children }) => {
	const dispatch = useDispatch();
	const { isLoading, isSignIn, userData } = useSelector((state) => state.signIn);

	const authUser = async ({ email, password }) => {
		await dispatch(startSignIn(email, password));
	};

	return (
		<SignInContext.Provider value={{ authUser, isLoading, isSignIn, userData }}>{children}</SignInContext.Provider>
	);
};
