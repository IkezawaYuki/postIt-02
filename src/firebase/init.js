import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBac28Qak896Ej3Rd-V6we_loJBNdmaI5Q",
  authDomain: "ninja-smoothies-4b24e.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-4b24e.firebaseio.com",
  projectId: "ninja-smoothies-4b24e",
  storageBucket: "ninja-smoothies-4b24e.appspot.com",
  messagingSenderId: "315120371456",
  appId: "1:315120371456:web:b27393105315426f"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()