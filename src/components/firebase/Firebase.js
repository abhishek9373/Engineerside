import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAGR1LbobNHxcVsIBfbvwon20TAot6GjdY",
  authDomain: "engineerside-573ba.firebaseapp.com",
  projectId: "engineerside-573ba",
  storageBucket: "engineerside-573ba.appspot.com",
  messagingSenderId: "770196014693",
  appId: "1:770196014693:web:c63f95aa0422fba69f688c"
};

const app = initializeApp(firebaseConfig);

export  {app};