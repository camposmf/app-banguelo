
const firebaseConfig = {
    apiKey: "AIzaSyBYnNawqqpjegEoY3klg2cy5tc_zihP3Sw",
    authDomain: "app-firebase-in-js.firebaseapp.com",
    databaseURL: "https://app-firebase-in-js-default-rtdb.firebaseio.com",
    projectId: "app-firebase-in-js",
    storageBucket: "app-firebase-in-js.appspot.com",
    messagingSenderId: "15416136430",
    appId: "1:15416136430:web:56b1d76fb32909c51919ff"
};

firebase.initializeApp(firebaseConfig);

const actionCodeSettings = {
    url: 'https://127.0.0.1'
};
  
const database = firebase.database();
const dbRefUsers = database.ref('users');