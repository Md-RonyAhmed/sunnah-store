/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * Updates the user's profile with the given name. The photoURL will be determined as follows:
   * - If `auth.currentUser.photoURL` already exists (e.g., from Google login), use that.
   * - Otherwise, generate a placeholder letter avatar from the user's first name.
   */
  const updateUserProfile = (name) => {
    const firstName = name?.split(" ")[0] || "U";
    const firstChar = firstName.charAt(0).toUpperCase();

    // Create a simple SVG with the first letter
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" style="background: #00BF63; border-radius: 50%;">
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="120" fill="#fff" font-family="Arial">
          ${firstChar}
        </text>
      </svg>
    `;

    // Convert the SVG to base64 data URL
    const base64SVG = btoa(svg);
    const placeholderPhoto = `data:image/svg+xml;base64,${base64SVG}`;

    // If the user logged in with Google and already has a photoURL, use that
    const currentPhotoURL = auth.currentUser?.photoURL;
    const finalPhotoURL =
      currentPhotoURL && currentPhotoURL.trim() !== ""
        ? currentPhotoURL
        : placeholderPhoto;

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: finalPhotoURL,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  // Implement signOutUser if needed for the logout logic in your navbar
  const signOutUser = () => {
    setLoading(true);
    return auth.signOut().then(() => setLoading(false));
  };

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
