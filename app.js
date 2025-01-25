import { onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";




const logOut_btn = document.querySelector('#logOut_btn');


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in");
    const uid = user.uid;

  } else {
    console.log("user is not logged in");

  }
});





logOut_btn.addEventListener('click', logOutUser)

function logOutUser(){
  signOut(auth).then(() => {
    window.location = 'login.html'
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    alert(error)
  });
}