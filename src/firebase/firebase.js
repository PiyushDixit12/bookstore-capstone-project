
import firebase from 'firebase/compat/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import "firebase/compat/firestore"
// npm install firebass
// npm install -g firebase-tools

const firebaseConfig = {
    apiKey: "AIzaSyBqV9B2ft5aqtOXhYtq9Pc8S-PLfO5vvVE",
    authDomain: "capstone-project-bookstore.firebaseapp.com",
    projectId: "capstone-project-bookstore",
    storageBucket: "capstone-project-bookstore.appspot.com",
    messagingSenderId: "1064010249013",
    appId: "1:1064010249013:web:5424b0e200bbf9c791927c"
};


// Initialize Firebase connect to firebase
export const app = firebase.initializeApp(firebaseConfig);
// connect to firestore database 
export const myDataBase = firebase.firestore();

// GoogleAuthProvider class helep to connect google auth provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();          


// ================== to store data =================
// mydatabase.collection("collection").add({
// slno:
// name  etc.
// })


//================== to get data ================
// mydatabase.collection("collection").onSnapshot((snapshot)=>{
//   spnapshot = [doc,doc,doc,doc]
//  snapshot.map((e)=>console.log(i.data()))
// })