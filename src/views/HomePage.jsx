import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import {
  subscribeContactsAction,
  unsubscribeContactsAction,
  subscribeConversationsList,
  unsubscribeConversationsList,
} from '../store/actions';
import { userSelector } from '../store/selectors';

const createConversation = (userList) => {
  const db = firebase.database();
  const newConvRef = db.ref('conversations').push();
  const {
    path: {
      pieces_: [, uidConv],
    },
  } = newConvRef;

  newConvRef.set({
    userList,
    messages: [],
  });

  userList.forEach((curr) => {
    db.ref(`conversationsList/${curr}/${uidConv}`).set({
      userList: userList.filter((u) => u !== curr),
      unread: 0,
    });
  });
  return uidConv;
};

const HomePage = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('Test : ');

    const userList = [
      user.uid,
      '9NbBc6U8wqe2w1zwTeVTVoIQM5s1',
      'x96kiiQ87RSwux1mi0eoGTwegwY2',
    ];
    createConversation(userList);
  };

  useEffect(() => {
    dispatch(subscribeContactsAction());
    dispatch(subscribeConversationsList(user));

    return () => {
      dispatch(unsubscribeContactsAction());
      dispatch(unsubscribeConversationsList());
    };
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <button type="button" onClick={handleClick}>
        Test fonctions firebases
      </button>
    </div>
  );
};

export default HomePage;
