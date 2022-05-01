import {FirebaseOptions, initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_GFB_API_KEY,
  appId: process.env.REACT_APP_GFB_APP_ID,
  projectId: process.env.REACT_APP_GFB_PROJECT_ID,
  authDomain: process.env.REACT_APP_GFB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_GFB_DB_URL,
  storageBucket: process.env.REACT_APP_GFB_BUCKET,
  messagingSenderId: process.env.REACT_APP_GFB_MSG_ID,
};

const app = initializeApp(firebaseConfig);

export const DATABASE = getDatabase(initializeApp(firebaseConfig));
export const DATABASE_PATH = 'highscores';
