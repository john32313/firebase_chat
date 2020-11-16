import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';
import Messages from '../components/Messages';
import SignOut from '../components/SignOut';
import ConversationList from '../components/ConversationList';
import AddConversationButton from '../components/AddConversationButton';
import {
  subscribeContactsAction,
  subscribeConversationsList,
  unsubscribeContactsAction,
  unsubscribeConversationsList,
} from '../store/actions';

const FullHeightPaper = withStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
  },
}))(Paper);

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
    <Box component="main" height="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <AddConversationButton />
          <Box ml="auto">
            <SignOut />
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid item md={3}>
          <FullHeightPaper elevation={4}>
            <ConversationList />
          </FullHeightPaper>
        </Grid>
        <Grid item md={9}>
          <Route path="/messages/:convoUid">
            <Messages />
          </Route>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
