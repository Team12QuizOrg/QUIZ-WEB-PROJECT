import { get,onValue, update, set, ref, query, equalTo, orderByChild, push, child } from 'firebase/database';
import { db } from "../config/firebase-config";
import { DEFAULT_AVATAR_URL } from '../common/constants';

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};
export const getUserByHandleLive = (handle, listener) => {

  return onValue( ref(db, `users/${handle}`),
  snapshot => {
    const data = snapshot.exists() ? snapshot.val() : {};
       
        const res = data;
       console.log(res)
       console.log(res.photoURL)
        listener(res.photoURL);
  }
  
  
  
  );
};
export const createUserHandle = (handle, uid, email, firstName, lastName, phone, userType) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, firstName, lastName, phone, userType, isAdmin: false, isBlocked: false, createdOn: Date.now(), likedPosts: {} , commentedPosts: {}, photoURL: DEFAULT_AVATAR_URL})
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
export const makeEducator = (handle) => {
  const isAEducatorRef = ref(db, `/users/${handle}/`);
  return update(isAEducatorRef, {
    userType: "teacher",
  }) 
    .then(() => {})
    .catch((error) => {
      console.error('Error making user an admin', error);
    });
};

export const editUser = (handle,  {firstName, lastName, caption, phoneNumber }) => {
  const userRef = ref(db, `/users/${handle}`);
  if(phoneNumber.length < 10 && phoneNumber.length > 10) {
    alert("Invalid phone number");
    return;
  }

  return update(userRef, {
    firstName: firstName,
    lastName: lastName,
    caption: caption,
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

export const formatDate = (timestamp) => {
  const dateObj = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format
  };

  const formattedDate = dateObj.toLocaleString(undefined, options);

  return formattedDate;
};

export const createQuizState = (handle, quizData, quizId) => {
  const userRef = ref(db, `users/${handle}`);

  return get(userRef)
    .then((userDataSnapshot) => {
      if (userDataSnapshot.exists()) {
        const userData = userDataSnapshot.val();

    
        userData.quizState = userData.quizState || {};
        userData.quizState[quizId] = quizData;

        return update(userRef, userData).then(() => userData);
      } else {
        console.error('User not found');
        return null;
      }
    })
    .catch((error) => {
      console.error('Error creating/updating quiz state:', error);
      throw error;
    });
};

export const getQuizState = (handle, quizId) => {
  const userRef = ref(db, `users/${handle}/quizState/${quizId}`);

  return get(userRef)
    .then((userDataSnapshot) => {
      if (userDataSnapshot.exists()) {
        return userDataSnapshot.val() || {};
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.error('Error getting quiz state:', error);
      throw error;
    });
};


export const getUserScoreBoard = (handle) => {
  const userRef = ref(db, `users/${handle}/scoreBoards`);

  return get(userRef)
    .then((userDataSnapshot) => {
      if (!userDataSnapshot.exists()) {
        return [];
      }

      const usersDocument = userDataSnapshot.val();
      const quizResults = Object.keys(usersDocument).map((key) => {
        const group = usersDocument[key];
  
        return group; 
      });

    
      return quizResults;
    })
    .catch((error) => {
      console.error('Error getting quiz state:', error);
      throw error;
    });
};

export const getUsersQuizzes = (handle) => {
  const userRef = ref(db, `users/${handle}/quizState`);

  return get(userRef)
    .then((userDataSnapshot) => {
      if (!userDataSnapshot.exists()) {
        return [];
      }

      const usersDocument = userDataSnapshot.val();
      const quizResults = Object.keys(usersDocument).map((key) => {
        const group = usersDocument[key];
  
        return group; 
      });

    
      return quizResults;
})
};
