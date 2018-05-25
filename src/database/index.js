import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDFOoU3BmMdt8BAzu7TPAPBH-2kHgxe6lQ",
  authDomain: "le-trellello.firebaseapp.com",
  databaseURL: "https://le-trellello.firebaseio.com",
  projectId: "le-trellello",
  storageBucket: "le-trellello.appspot.com",
  messagingSenderId: "268120592427"
};

Firebase.initializeApp(config);

const database = Firebase.database();

export const columns = database.ref('/columns');
export const cards = database.ref('/cards');
