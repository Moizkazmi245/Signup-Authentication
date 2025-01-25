import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const signup_email = document.querySelector('#signup_email');
const signup_password = document.querySelector('#signup_password');
const signup_btn = document.querySelector('#signup-btn');

signup_btn.addEventListener('click', createUserAccount)


function createUserAccount() {
    // console.log("email==>", signup_email.value);
    // console.log("password==>", signup_password.value);
    
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("user==>", user);
    
      
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  
  }