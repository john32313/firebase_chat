/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  withStyles,
  Box,
  Paper,
  Grid,
  AppBar,
  Toolbar,
} from '@material-ui/core';
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
import {
  userSelector,
  conversationsListArraySelector,
} from '../store/selectors';
import { createConversation } from '../utils/utilsFirebase';
import { checkConvExist } from '../utils/utils';

const FullHeightPaper = withStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
  },
}))(Paper);

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const conversationsList = useSelector(conversationsListArraySelector);

  const history = useHistory();

  const handleNewConv = (userIds) => {
    let convoUid = checkConvExist(conversationsList, userIds);
    if (!convoUid) convoUid = createConversation([...userIds, user.uid]);
    history.push(`/messages/${convoUid}`);
  };

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
          <AddConversationButton handleNewConv={handleNewConv} />
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
