import { get, update, set, ref, query, equalTo, orderByChild, } from 'firebase/database';
import { db } from "../congif/firebase-config";

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email, firstName, lastName, phone, userType) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, firstName, lastName, phone, userType, isAdmin: false, isBlocked: false, createdOn: Date.now(), likedPosts: {} , commentedPosts: {}, photoURL: ''})
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getAllUserData = () => {
  return get(ref(db, 'users'))
  .then(snapshot => {
    if (!snapshot.exists()) {
      return [];
    }
    return fromPostsDocument(snapshot);
  });
};

const fromPostsDocument = snapshot => {
  const usersDocument = snapshot.val();

  return Object.keys(usersDocument).map(key => {
    const user = usersDocument[key];

    return {
      ...user,
      id: key,
      createdOn: new Date(),
      likedBy: user.likedBy ? Object.keys(user.likedBy) : [],
    };
  });
}


export const makeAdmin = (handle) => {
  const isAdminRef = ref(db, `/users/${handle}/`);
  return update(isAdminRef, {
    isAdmin: true,
  }) 
    .then(() => {})
    .catch((error) => {
      console.error('Error making user an admin', error);
    });
};

export const blockUser = (handle) => {
  const isBlockRef = ref(db, `/users/${handle}/`);
  return update(isBlockRef, {
    isBlocked: true,
  }) 
    .then(() => {})
    .catch((error) => {
      console.error('Error blocking user', error);
    });
};

export const unBlockUser = (handle) => {
  const isBlockRef = ref(db, `/users/${handle}/`);
  return update(isBlockRef, {
    isBlocked: false,
  }) 
    .then(() => {})
    .catch((error) => {
      console.error('Error blocking user', error);
    });
};

export const editUser = (handle,  {firstName, lastName, phoneNumber }) => {
  const userRef = ref(db, `/users/${handle}`);
  if(phoneNumber.length < 10 && phoneNumber.length > 10) {
    alert("Invalid phone number");
    return;
  }

  return update(userRef, {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber
  })
  .then(() => {})
  .catch((error) => {
    console.error('Error changing user fields', error);
  });
};

export const addUserPhotoToData = (handle, photoURL) => {
  return update(ref(db), {
    [`users/${handle}/photoURL`]: photoURL,
  })

  .then(() => {})
  .catch((error) => {
    console.error('Error changing user fields', error);
  });
}