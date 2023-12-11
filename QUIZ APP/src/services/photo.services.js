import { getDownloadURL, ref, uploadBytes, deleteObject, getStorage } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import { storage, auth } from '../config/firebase-config'
import { useEffect, useState } from 'react'
import { addUserPhotoToData, removeUserPhotoFromData } from './users.services'
export function useAuth () {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub
  }, [])

  return currentUser
}

export const upload = (file, currentUser, setLoading) => {
  const fileRef = ref(storage, `${currentUser.handle}.png`)

  setLoading(true)

  return uploadBytes(fileRef, file)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((photoURL) => addUserPhotoToData(currentUser.handle, photoURL))
    .then(() => {
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error uploading file', error)
      setLoading(false)
    })
}

export const deletePhoto = (currentUser, setLoading) => {
  const fileRef = ref(storage, `${currentUser.handle}.png`)

  setLoading(true)

  return deleteObject(fileRef)
    .then(() => removeUserPhotoFromData(currentUser.handle))
    .then(() => {
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error uploading file', error)
      setLoading(false)
    })
}
