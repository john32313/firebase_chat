/* eslint-disable prefer-destructuring */
import firebase from 'firebase/app';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { allUsersSelector } from '../store/selectors';

/**
 * A partir de id conversation transmis
 * ecoute vers la conversation /conversations/uidconv
 * trie les messages dans ordre de timestamp
 * retourne la conversation
 */

// ecouteur separé:  messages et userlist
const useSubscribeConversation = (uidConvToShow = 'uidconv4') => {
  const allUsers = useSelector(allUsersSelector);
  const [conversation, setConversation] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userListObject, setUserListObject] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`conversations/${uidConvToShow}`)
      .on('value', (snapshot) => {
        const result = Object.entries(snapshot.val());
        const convUnorderer = result[0][1];
        const timeRangeByOrder = Object.keys(convUnorderer).sort();
        setConversation(timeRangeByOrder.map((time) => convUnorderer[time]));
        setUserList(result[1][1]);
      });
  }, []);

  useEffect(() => {
    console.log('here');
    setUserListObject(
      userList.reduce((acc, curr) => ({ ...acc, [curr]: allUsers[curr] }), {}),
    );
  }, [userList, allUsers]);

  return [conversation, userListObject];
};

const unsubscribeConversation = (uidConvToShow = 'uidconv4') => {
  firebase.database().ref(`conversations/${uidConvToShow}`).off('value');
};

export { useSubscribeConversation, unsubscribeConversation };
