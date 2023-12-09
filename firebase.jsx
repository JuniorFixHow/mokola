// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, initializeAuth } from 'firebase/auth';
import { initializeFirestore,  persistentLocalCache,  persistentMultipleTabManager,  persistentSingleTabManager} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCldk2JFGXzWUnmZNNRUdi4E4Fy2PjgXWE",
  authDomain: "mokola-74591.firebaseapp.com",
  projectId: "mokola-74591",
  storageBucket: "mokola-74591.appspot.com",
  messagingSenderId: "368988567979",
  appId: "1:368988567979:web:514b55bd11dd7b03e37aee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initializeAuth(app);

export const db = initializeFirestore(app, {
    experimentalForceLongPolling:true,
    localCache:persistentLocalCache(/*settings*/{tabManager: persistentSingleTabManager()})
})

export const auth = getAuth();