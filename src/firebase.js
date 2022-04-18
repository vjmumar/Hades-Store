import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { startSignIn } from './redux/actions/signIn';
import { getStorage } from 'firebase/storage';
import { store } from './index';

const savedId = localStorage.getItem('firebaseId');
export const firebaseConfig = {
	apiKey: 'AIzaSyCCS4-9Eh2mzD4-EQn1GKWLuOdF2f_nh_k',
	authDomain: 'eccommerce-517f7.firebaseapp.com',
	projectId: 'eccommerce-517f7',
	storageBucket: 'eccommerce-517f7.appspot.com',
	messagingSenderId: '835399084814',
	appId: '1:835399084814:web:3ab9f140c5f6f792fac55f'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

onAuthStateChanged(getAuth(), (user) => {
	if (user) {
		const uid = user.uid;
		store.dispatch(startSignIn('', '', uid));
	}
});
