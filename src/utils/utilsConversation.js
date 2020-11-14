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

const useSubscribeConversation = (uidConvToShow = 'uidconv4') => {
  const allUsers = useSelector(allUsersSelector);
  const [conversation, setConversation] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userListObject, setUserListObject] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`conversations/${uidConvToShow}/messages`)
      .on('value', (snapshot) => {
        const result = snapshot.val();
        const timeRangeByOrder = Object.keys(result).sort();
        setConversation(timeRangeByOrder.map((time) => result[time]));
      });
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref(`conversations/${uidConvToShow}/userList`)
      .on('value', (snapshot) => {
        setUserList(snapshot.val());
      });
  }, []);

  useEffect(() => {
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
