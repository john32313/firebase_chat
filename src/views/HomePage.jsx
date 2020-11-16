import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Messages from '../components/Messages';
import SignOut from '../components/SignOut';
import ConversationList from '../components/ConversationList';
import {
  subscribeContactsAction,
  subscribeConversationsList,
  unsubscribeContactsAction,
  unsubscribeConversationsList,
} from '../store/actions';

// maybe rename this page/component ?
function HomePage() {
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
      <SignOut />

      <Grid container>
        <Grid item lg={3}>
          <ConversationList />
        </Grid>
        <Grid item lg={9}>
          <Route path="/messages/:convoUid">
            <Messages />
          </Route>
        </Grid>
      </Grid>
    </main>
  );
}

export default HomePage;
