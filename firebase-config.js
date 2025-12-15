// firebase-config.js
// IMPORTANT: Replace with YOUR Firebase config from Firebase Console

const firebaseConfig = {
  apiKey: "AIzaSyAUit5I8Qml9wWIsKATJkwOhOdlCw06irg",
  authDomain: "slangaddaai.firebaseapp.com",
  projectId: "slangaddaai",
  storageBucket: "slangaddaai.firebasestorage.app",
  messagingSenderId: "633159892736",
  appId: "1:633159892736:web:b33c2d89f3cba1f609fde5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
console.log("Firebase initialized!");
