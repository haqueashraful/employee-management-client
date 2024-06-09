import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';


export const Context = createContext();
export const MyContext = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [stateLoader, setStateLoader] = useState(true);
  const axiosPublic = useAxiosPublic();
  

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const profileUpdate = (name, photo_url) => {
    setLoad(true);
    updateProfile(auth.currentUser, {
      displayName: name || user?.displayName,
      photoURL: photo_url || user?.photoURL,
    })
      .then(() => {
      })
      .catch((error) => {
        console.log("Cannot update profile:", error.message);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const logInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password)
  };

  const registerUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const signInWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider)
  };

  const signInWithGitHub = () => {
    setLoader(true);
    return signInWithPopup(auth, gitHubProvider)
  }
  const signInWithTwitter = () => {
    setLoader(true);
    return signInWithPopup(auth, twitterProvider)
  }
  const logOutUser = () => {
    return signOut(auth)
      .then(() => {
        console.log("Logout successfully");
        setUser(null);
      })
      .catch((error) => {
        console.log("Error signing out:", error.message);
        throw error;
      })
      .finally(() => {
        setLoader(false);
      });
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    if(currentUser){
      const email = currentUser && currentUser.email;
      const firedResponse = await axiosPublic.get(`/users/fired/${email}`);
      const isFired = await firedResponse.data.isFired;
      if (isFired) {
        setUser(null);
        await logOutUser();
        await axiosPublic.post("/logout")
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Login failed",
          text: "You are not allowed to log in.",
          showConfirmButton: true,
        });
        return;
      }
    }


      if (currentUser) {
        axiosPublic.post("/jwt", { email : currentUser?.email})
          .then((response) => {
            setUser(currentUser);
          })
          .catch((error) => {
            console.error("Failed to fetch token:", error);
          })
          .finally(() => {
            setLoader(false);
          });
      } else {
        axiosPublic.post("/logout")
        setLoader(false); 
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
  
 

  const value = {
    setUser,
    logOutUser,
    logInUser,
    registerUser,
    profileUpdate,
    signInWithGoogle,
    signInWithGitHub,
    signInWithTwitter,
    setLoad,
    setLoader,
    setStateLoader,
    stateLoader,
    loader,
    user,
    load
  };


  return <Context.Provider value={value}>{children}</Context.Provider>;
};


MyContext.propTypes = {
  children: PropTypes.node.isRequired,
};
