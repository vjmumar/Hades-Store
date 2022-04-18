import React, { createContext, useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { toast } from 'react-toastify';
import useComponentDidMount from '../../hooks/useComponentDidMount';

export const AccountManagerContext = createContext({});

export const AccountManagerProvider = ({ children }) => {
	const id = localStorage.getItem('firebaseId');
	const [ userData, setUserData ] = useState([]);
	const [ isLoading, setLoading ] = useState(false);

	const getUserDetails = async () => {
		try {
			setLoading(true);
			const data = await getDoc(doc(db, `Users/${id}`));
			setUserData(data.data());
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	const changePassword = async (password) => {
		if (password.length !== 0) {
			try {
				const user = await getAuth().currentUser;
				await updatePassword(user, password);
				toast.success('Password Updated');
			} catch (err) {
				console.log(err);
				toast.error('Password should be at least 6 characters');
			}
		}
	};

	const setNewUserDetails = async ({ firstName, lastName, address, newPassword }) => {
		try {
			setLoading(true);
			const ref = doc(db, `Users`, id);
			const data = {
				firstName,
				lastName,
				address,
				updatedAt: serverTimestamp()
			};

			if (newPassword) {
				await changePassword(newPassword);
				await updateDoc(ref, data);
			} else {
				toast.success('Updating Details Success');
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	const deleteImageFromStorage = async (storage) => {
		try {
			if (userData.imageUrl) {
				const deleteRef = ref(storage, `Images/${userData.imageName}`);
				await deleteObject(deleteRef);
			}
		} catch (err) {}
	};

	const handleChangeImage = async (data) => {
		try {
			setLoading(true);
			const storage = await getStorage();
			const refs = doc(db, `Users`, id);
			const imageName = `${Math.random()}${data.target.files.name}`;
			const storageRef = ref(storage, `Images/${imageName}`);
			await uploadBytes(storageRef, data.target.files[0]);
			const url = await getDownloadURL(storageRef);
			await updateDoc(refs, { imageUrl: url.toString(), imageName: imageName });
			await deleteImageFromStorage(storage);
			await getUserDetails();
			toast.success('Updating Image Success');
			setLoading(false);
		} catch (err) {
			setLoading(false);
			toast.error('Updating Image Fail');
		}
	};

	useComponentDidMount(() => {
		getUserDetails();
	});

	return (
		<AccountManagerContext.Provider value={{ userData, isLoading, setNewUserDetails, handleChangeImage }}>
			{children}
		</AccountManagerContext.Provider>
	);
};
