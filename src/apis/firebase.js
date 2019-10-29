import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";

// firebase init
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FVUE_APP_IREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
// firebase.performance();
// firebase.analytics();

export default firebase;

export async function find(collection, { value = '', limit = 4 }) {
  try {
    let req = firebase.firestore()
      .collection(collection)
      .orderBy("random", "asc");

    if(value !== '') {
      req = req.where('text', '==', value);
    }
    
    const results = await req.limit(limit).get();
    console.log('results', results.docs);
    return deserialize(results.docs);
  }

  catch(error) {
    throw `An error occured while requesting the collection '${collection}' from Firebase: ${error}`;
  }
}

export async function random(collection, { limit }) {
  try {
    const req = firebase.firestore()
      .collection(collection)
      .orderBy("random", "asc")
      .limit(limit)
      .startAfter(Math.round(Math.random() * 69999999));

    const results = await req.get();

    return deserialize(results.docs);
  }

  catch(error) {
    throw `An error occured while requesting the collection '${collection}' from Firebase: ${error}`;
  }
}

export function deserialize(data) {
  if(Array.isArray(data)) {
    return data.map(d => deserialize(d));
  }

  return { ...{ id: data.id }, ...data.data() };
}