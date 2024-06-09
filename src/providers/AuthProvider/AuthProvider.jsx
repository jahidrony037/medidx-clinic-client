import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import useAxiosPublic from "../../hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userInfo = { email: currentUser?.email || user?.email };
        const res = await axiosPublic.post("/jwt", userInfo);
        // console.log(res.data);
        if (res.data) {
          const token = res.data?.token;
          localStorage.setItem("access-token", token);
        } else {
          console.log("error occured");
        }

        setLoading(false);
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe;
    };
  }, [axiosPublic, user]);

  const allInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    updateUser,
    LogOut,
    loginWithGoogle,
    show,
    setShow,
  };
  return (
    <AuthContext.Provider value={allInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
