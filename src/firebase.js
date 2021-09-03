import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyB4a4J5sB9AWOuG5LPQdqrxcj2Y9eZc22k",
  authDomain: "manvir-firebase.firebaseapp.com",
  projectId: "manvir-firebase",
  storageBucket: "manvir-firebase.appspot.com",
  messagingSenderId: "380870035420",
  appId: "1:380870035420:web:838d57aa5c0f60bda73119",
  measurementId: "G-TSS0R2DFCE"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.database();

