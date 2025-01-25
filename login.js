import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const signin_email = document.querySelector('#signin_email');
const signin_password = document.querySelector('#signin_password');
const signin_btn = document.querySelector('#signin-btn');

signin_btn.addEventListener('click', SignInUser)


function SignInUser(){
    signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user", user);
      window.location = 'index.html'
      
      // ...
    })

    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
    });
  
  }