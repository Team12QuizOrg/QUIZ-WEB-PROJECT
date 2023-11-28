import { get, set, ref, update, push, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config';



export const addGroup = (handle, groupName) => {
  const date = Date();

  return push(ref(db, 'groups'), {})
    .then(result => {
      const members = {};
      members[handle] = true;

      set(ref(db, `groups/${result.key}`), { groupName, id: result.key, members, owner: handle, dateCreated: date });
      return update(ref(db), {
        [`users/${handle}/usersGroups/${groupName}`]: result.key,
      })
        .then(() => {
          return result.key;
        });
    });
};

export const getGroupByName = (name) => {
    return get(query(ref(db, 'groups'), orderByChild('name'), equalTo(name)));
  };

  export const addGroupMember = (groupId, member, groupName) => {
    return update(ref(db), {
      [`groups/${groupId}/members/${member}`]: true,
      [`users/${member}/groups/${groupName}`]: groupId,
    });
  };
  
  export const getAllTeamMembers = (groupId) => {
    // todo: do not return snapshot but real data (example {} or [{}....])
    return get(ref(db, `groups/${groupId}/members`))
      .then(snapshot => {
        if (!snapshot.exists()) {
          return [];
        }
        return snapshot;
      });
  };

  export const deleteTeamMember = (groupId, groupName, user) => {

    return update(ref(db), {
      [`groups/${groupId}/members/${user}`]: null,
      [`users/${user}/groups/${groupName}`]: null,
    });
  };
  
  
  
  