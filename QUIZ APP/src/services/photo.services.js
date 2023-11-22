import { getDownloadURL,  ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { storage, auth } from "../congif/firebase-config";
import { useEffect, useState } from "react";
import {addUserPhotoToData} from "./users.services"
export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
      return unsub;
    }, [])
  
    return currentUser;
  }

export const  upload =(file, currentUser, setLoading) => {
    const fileRef = ref(storage, `${currentUser.handle}.png` );
  
    setLoading(true);
  
    return uploadBytes(fileRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((photoURL) => addUserPhotoToData(currentUser.handle, photoURL ))
      .then(() => {
        setLoading(false);
        alert("Uploaded file!");
      })
      .catch((error) => {
        console.error('Error uploading file', error);
        setLoading(false);
      });
  }
  
  