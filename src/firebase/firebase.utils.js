// // Google Copy from creating the project
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBlTUBUPMfufhxOPBpH4qUBiHhXgzLmjEU',
  authDomain: 'crwn-db-c3f35.firebaseapp.com',
  projectId: 'crwn-db-c3f35',
  storageBucket: 'crwn-db-c3f35.appspot.com',
  messagingSenderId: '526317495389',
  appId: '1:526317495389:web:bf0784377efceca9e659b4',
  measurementId: 'G-ECH144ZDG4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Sign in with Google
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The sign-in user info
      const user = result.user
    })
    .catch((error) => {
      // Handle Errors here
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
      // The email of the user's account used
      const email = error.email
      // The AuthCredential type that was used
      const credential = GoogleAuthProvider.credentialFromError(error)
    })

// Add logged in users to firebaseDB
const db = getFirestore()

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = doc(db, 'users', `${userAuth.uid}`)
  const snapShot = await getDoc(userRef)

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (err) {
      console.log('error creating user', err.message)
    }
  }

  return userRef
}

// // udemy instructions
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'

// const config = {
//   apiKey: "AIzaSyBlTUBUPMfufhxOPBpH4qUBiHhXgzLmjEU",
//   authDomain: "crwn-db-c3f35.firebaseapp.com",
//   projectId: "crwn-db-c3f35",
//   storageBucket: "crwn-db-c3f35.appspot.com",
//   messagingSenderId: "526317495389",
//   appId: "1:526317495389:web:bf0784377efceca9e659b4",
//   measurementId: "G-ECH144ZDG4"
// }

// firebase.initializeApp(config)

// export const auth = firebase.auth()
// export const firestore = firebase.firestore()

// const provider = new firebase.auth.GoogleAuthProvider()
// provider.setCustomParameters({ prompt: 'select_account' })
// export const signInWithGoogle = () => auth.signInWithPopup(provider)

// // export default firebase
