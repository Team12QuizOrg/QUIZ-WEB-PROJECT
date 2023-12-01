import { get, set, ref, update, push, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config';



export const addGroup = (handle, groupName) => {
  
    const groupRef = ref(db, `/groups/`);
    const newGroupKey = push(groupRef).key;
    const members = {};
    members[handle] = handle;

  
    const newGroup = {
      groupName: groupName,
      timestamp: Date.now(), 
      members, 
      owner: handle,
    };
  
    const groupPath = `/groups/${newGroupKey}`;
    const userGroupPath = `/users/${handle}/usersGroups//${newGroupKey}`;
   
  
    const updates = {};
    updates[groupPath] = newGroup;
    updates[userGroupPath] = groupName;
    
  
    return onValue(
        update(ref(db), updates)
      .then(() => {})
      .catch((error) => {
        console.error('Error adding group:', error);
      }));
  };

  export const addGroupMember = (groupId, member, groupName) => {
    return update(ref(db), {
      [`groups/${groupId}/members/${member}`]: member,
      [`users/${member}/usersGroups/${groupId}`]: groupName,
    });
  };

  export const deleteGroupMember = (groupId, groupName, member) => {

    return update(ref(db), {
      [`groups/${groupId}/members/${member}`]: null,
      [`users/${member}/usersGroups/${groupName}`]: null,
    });
  };
  
  
  export const getAllGroupMembers = (groupId) => {

    return get(ref(db, `groups/${groupId}/members`))
      .then(snapshot => {
        if (!snapshot.exists()) {
          return [];
        }
        return fromGroupsDocument(snapshot);
      });
  };

  export const getGroupOwner = (groupId) => {

    return get(ref(db, `groups/${groupId}/owner`))
      .then(snapshot => {
        if (!snapshot.exists()) {
          return [];
        }
        return (snapshot.val());
      });
  };
  
  const fromGroupsDocument = snapshot => {
    const groupsDocument = snapshot.val();
  
    return Object.keys(groupsDocument).map(key => {
      const group = groupsDocument[key];

      return  group
      
    });
  }

  export const getLiveTeamMembers = (listener, groupId) => {
    return onValue(
      ref(db, `groups/${groupId}/members`),
      snapshot => {
        const data = snapshot.exists() ? snapshot.val() : {};
       
        const res = Object.keys(data);
       
        listener(res);
      });
  };

  export const getLiveUsersGroups = (listener, handle) => {
    return onValue(
      ref(db, `users/${handle}/usersGroups/`),
      snapshot => {
        const data = snapshot.exists() ? snapshot.val() : {};
        const res = Object.entries(data);
        listener(res);
      });
  };
  