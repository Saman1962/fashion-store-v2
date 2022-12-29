import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBC_uIfYiiXupemdWs0E0UVQM2QDgBoBDA",
    authDomain: "fashion-store-ae54b.firebaseapp.com",
    databaseURL: "https://fashion-store-ae54b.firebaseio.com",
    projectId: "fashion-store-ae54b",
    storageBucket: "fashion-store-ae54b.appspot.com",
    messagingSenderId: "966414297727",
    appId: "1:966414297727:web:2210da18126892a6d5ed4a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
}