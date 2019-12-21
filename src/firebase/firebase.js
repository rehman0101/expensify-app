import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDjpv3_VZRULcecomj1YL8JFNvZQfxeafo",
    authDomain: "expensify-e5edb.firebaseapp.com",
    databaseURL: "https://expensify-e5edb.firebaseio.com",
    projectId: "expensify-e5edb",
    storageBucket: "expensify-e5edb.appspot.com",
    messagingSenderId: "823555023205",
    appId: "1:823555023205:web:1ecf91c5b74ebc63fe818c"
}

firebase.initializeApp(config);

const database = firebase.database();

export {firebase, database as default};


