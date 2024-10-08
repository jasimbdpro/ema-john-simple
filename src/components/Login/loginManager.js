import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);

export const GoogleSignInHandler = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(result)
            // eslint-disable-next-line no-unused-vars
            const token = credential.accessToken;
            // The signed-in user info.
            // console.log(token)
            if (result.user) {
                // IdP data available using getAdditionalUserInfo(result)
                //This below part ↓↓↓ is not included in firebase docs 
                //destructing the result.user object (from the remote server)
                const { displayName, photoURL, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                return signedInUser;
            }

        })
        .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage)
        })
}

export const GoogleSignOutHandler = () => {
    return signOut(auth)
        .then(() => {

            const signedOutUser = {
                inSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signedOutUser

        })
        .catch((error) => {
            // An error happened.

        })
}
export const newCreateUserWithEmailAndPassword = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User created:", userCredential.user);

            const newUserInfo = { ...userCredential.user, success: true, error: '' };
            updateNameOfUser(name)
            return newUserInfo

        })
        .catch((error) => {
            console.log("Error creating users:", error.message);

        });
}
export const updateNameOfUser = name => {
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });

}
export const signInWithEmailAndPasswordRefactored = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const newUserInfo = { ...userCredential.user, name: userCredential.user.displayName, success: true, error: '' }
            return newUserInfo;



            // ...
        })
        .catch((error) => {
            //error here
        });
}