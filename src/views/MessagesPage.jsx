import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Messages from '../components/Messages';
import ConversationList from '../components/ConversationList';
import {
  subscribeContactsAction,
  subscribeConversationsList,
  unsubscribeContactsAction,
  unsubscribeConversationsList,
} from '../store/actions';

// maybe rename this page/component ?
function MessagesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeContactsAction());
    dispatch(subscribeConversationsList());

    return () => {
      dispatch(unsubscribeContactsAction());
      dispatch(unsubscribeConversationsList());
    };
  }, []);

  return (
    <main className="flex">
      <ConversationList />
      <Route path="/messages/:convoUid">
        <Messages />
      </Route>
    </main>
  );
}

export default MessagesPage;
