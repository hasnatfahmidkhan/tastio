import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // email pass register
  const emailPassRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const updateProfileFunc = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // sign in with email pass
  const emailPassLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google sign in
  const googleSignInFunc = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //   sign out
  const signoutFunc = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    googleSignInFunc,
    signoutFunc,
    emailPassRegister,
    updateProfileFunc,
    emailPassLogin,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
