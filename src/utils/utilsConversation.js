/* eslint-disable prefer-destructuring */
import firebase from 'firebase/app';
import { useState, useEffect } from 'react';

/**
 * A partir de id conversation transmis
 * ecoute vers la conversation /conversations/uidconv
 * trie les messages dans ordre de timestamp
 * retourne la conversation
 */

const subscribeConversation = (uidConvToShow = 'uidconv4') => {
  const [conversation, setConversation] = useState([]);
  const [userList, setUserList] = useState([]);

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

  return [conversation, userList];
};

const unsubscribeConversation = (uidConvToShow = 'uidconv4') => {
  firebase.database().ref(`conversations/${uidConvToShow}`).off('value');
};

export { subscribeConversation, unsubscribeConversation };
