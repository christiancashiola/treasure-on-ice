import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.GFB_API_KEY,
  authDomain: process.env.GGB_AUTH_DOMAIN,
  databaseURL: process.env.GGB_DB_URL,
  storageBucket: process.env.GGB_STORAGE_BUCKET,
};
