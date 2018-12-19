import firebase from "firebase/app";
// Required for side-effects
import "firebase/firestore";

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};
let db;
if (!firebase.apps.length) {
  firebase.initializeApp(config);
  db = firebase.firestore();
  // Initialize Cloud Firestore through Firebase
  const settings = { /* your settings... */ timestampsInSnapshots: true };
  db.settings(settings);
}
if (!db) {
  db = firebase.firestore();
  const settings = { /* your settings... */ timestampsInSnapshots: true };
  db.settings(settings);
}
function appFireBase(keys) {
  let { analytics, storage } = keys;
  return {
    saveAnalytics: (agent, data) => {
      return db
        .collection(analytics)
        .doc(agent)
        .set(data);
    },
    getAnalytics: agent => {
      let ref = db.collection(analytics).doc(agent);
      return genericGet(ref);
    },
    saveWorkingData: (agent, data) => {
      return db
        .collection(storage)
        .doc(agent)
        .set({ record: data });
    },
    getWorkingData: (agent, defaultParam = []) => {
      var docRef = db.collection(storage).doc(agent);
      return genericGet(docRef, { record: defaultParam }).then(d => d.record);
    }
  };
}
function genericGet(ref, defaultParam = {}) {
  return ref
    .get()
    .then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        return defaultParam;
      }
    })
    .catch(function(error) {
      throw error;
    });
}

export default appFireBase;
