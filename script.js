const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBudjiFasxqqJACvTy5eOA1M5h0rv2gWLs",
  authDomain: "tgmlogin.firebaseapp.com",
  projectId: "tgmlogin",
  storageBucket: "tgmlogin.appspot.com",
  messagingSenderId: "828911141223",
  appId: "1:828911141223:web:ed09a5a92d286fe0946fc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get Firebase Auth instance
const auth = firebase.auth();

// handle sign-up form submission event
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get user input values
  const email = signUpForm.querySelector('input[type="email"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;
  const canal = signUpForm.querySelector('input[type="text"]').value;
  // create user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // save additional user data to database
      const userData = {
        email: userCredential.user.email,
        canal: canal
      };
      firebase.database().ref("users/" + userCredential.user.uid).set(userData);
      // redirect user to home page after successful sign-up
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// handle sign-in form submission event
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get user input values
  const email = signInForm.querySelector('input[type="email"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;
  // sign-in user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // redirect user to home page after successful sign-in
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
