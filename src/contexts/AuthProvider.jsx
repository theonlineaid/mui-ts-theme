// import React, { createContext, useState, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   getAuth,
//   signOut,
//   signInWithPopup,
//   GithubAuthProvider,
//   updateProfile,
//   GoogleAuthProvider,
//   fetchSignInMethodsForEmail,
// } from "firebase/auth";
// import app from "../firebase/firebase.config";
// const auth = getAuth(app);

// export const AuthContext = createContext(null);

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchSignInMethods = async (email) => {
//     try {
//       const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//       return signInMethods;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const registerUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password).catch(
//       (error) => console.log(error)
//     );
//   };

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   const sentEmailLink = () => {
//     const user = auth.currentUser;
//     return sendEmailVerification(user);
//   };

//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const signInWithGitHub = () => {
//     const provider = new GithubAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   const signInWithGmail = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   const recoverPassword = (email) => {
//     sendPasswordResetEmail(auth, email);
//   };

//   const logOut = () => {
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("AUth state change", currentUser);
//       setUser(currentUser);
//       setLoading(false);
//     });

//     // cleanup
//     return () => unsubscribe();
//   }, []);

//   const authInfo = {
//     user,
//     loading,
//     registerUser,
//     updateUserProfile,
//     sentEmailLink,
//     signIn,
//     signInWithGitHub,
//     signInWithGmail,
//     recoverPassword,
//     logOut,
//     fetchSignInMethods,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// }

// export default AuthProvider;
