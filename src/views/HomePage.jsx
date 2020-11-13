import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeContactsAction,
  unsubscribeContactsAction,
  subscribeConversationsList,
} from '../store/actions';
import { userSelector } from '../store/selectors';

const HomePage = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('Test : ');
  };

  useEffect(() => {
    dispatch(subscribeContactsAction());
    dispatch(subscribeConversationsList(user));

    return () => {
      dispatch(unsubscribeContactsAction());
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
