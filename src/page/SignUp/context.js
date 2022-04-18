import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSignUp } from '../../redux/actions/signUp';

export const SignUpContext = createContext({});

export const SignUpContextProvider = ({ children }) => {
	const { isLoading, userData } = useSelector((state) => state.signUp);
	const dispatch = useDispatch();

	const authUser = (data) => {
		dispatch(startSignUp(data));
	};

	return <SignUpContext.Provider value={{ authUser, isLoading, userData }}>{children}</SignUpContext.Provider>;
};
