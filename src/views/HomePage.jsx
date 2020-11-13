import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeContactsAction,
  unsubscribeContactsAction,
  subscribeConversationsList,
  unsubscribeConversationsList,
} from '../store/actions';
import { userSelector } from '../store/selectors';
import { createConversation, createMessage } from '../utils/utilsFirebase';

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
    const uidConv = createConversation(userList);
    const msg = 'first message !';
    createMessage(uidConv, user.uid, msg);
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
