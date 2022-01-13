import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbCLHJohLs2YHaTZO5PEW4tF-LvWGzG7E",
  authDomain: "todoapp-92ef7.firebaseapp.com",
  projectId: "todoapp-92ef7",
  storageBucket: "todoapp-92ef7.appspot.com",
  messagingSenderId: "321022956486",
  appId: "1:321022956486:web:9131a8de1e5084bf9818c7"
};
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
