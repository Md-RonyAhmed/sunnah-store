/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (name) => {
    return await updateProfile(auth?.currentUser, {
      displayName: name,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // result.user is the signed-in user with providerData that includes the Google photo URL
    setLoading(false);
    return result;
  };

  const sendResetPassword = async (email) => {
    setLoading(true);
    return await sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signOutUser,
    signInUser,
    signInWithGoogle,
    sendResetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
