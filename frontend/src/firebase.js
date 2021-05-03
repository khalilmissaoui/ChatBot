// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
import firebase from 'firebase'
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDSJcxBPEnwYzA8fE4GaKSd0LiTbP-s8s4",
    authDomain: "chatbot-pi-69581.firebaseapp.com",
    projectId: "chatbot-pi-69581",
    storageBucket: "chatbot-pi-69581.appspot.com",
    messagingSenderId: "796996028817",
    appId: "1:796996028817:web:1e19294000f0e19e32b230",
    measurementId: "G-PZ0BZK08RZ"
  };


  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export { storage, firebase as default };