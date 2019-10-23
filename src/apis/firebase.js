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



/**
 * @name findAll
 * @description Find all record of {collection} from Firebase
 * @param {*} collection The collection's name
 */
export async function findAll(collection) {
  try {
    const results = await firebase.firestore()
      .collection(collection)
      .orderBy("random", "asc")
      .startAfter(Math.round(Math.random() * 69999999))
      .limit(4)
      .get();
    return deserialize(results.docs);
  }

  catch(error) {
    throw `An error occured while requesting the collection '${collection}' from Firebase: ${error}`;
  }
}

/**
 * @name deserialize
 * @description Deserilize data from Firebase's API
 * @param {*} data
 */
export function deserialize(data) {
  if(Array.isArray(data)) {
    return data.map(d => deserialize(d));
  }

  return { ...{ id: data.id }, ...data.data() };
}