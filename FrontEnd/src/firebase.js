// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOIvsWE_NwUYx5K8p18d3sTo8YoEsS37M",
    authDomain: "shop24h-dbf37.firebaseapp.com",
    projectId: "shop24h-dbf37",
    storageBucket: "shop24h-dbf37.appspot.com",
    messagingSenderId: "1002988618243",
    appId: "1:1002988618243:web:74eceac1fcfce022d8c436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export default auth;