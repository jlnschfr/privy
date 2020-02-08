import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyBlY2FIq7DVRyNpJM3AIPT6-9rxefvNO40',
  authDomain: 'privy-notes.firebaseapp.com',
  databaseURL: 'https://privy-notes.firebaseio.com',
  projectId: 'privy-notes',
  storageBucket: 'privy-notes.appspot.com',
  messagingSenderId: '946240655964',
  appId: '1:946240655964:web:925b39c629ef4db14ecc99'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const database = firebase.database()
export const firestore = firebase.firestore()
export default firebase
