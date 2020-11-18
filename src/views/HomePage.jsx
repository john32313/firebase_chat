/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, AppBar, Toolbar, Hidden, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `
      "toolbar toolbar"
      "conversations messages"
      "conversations input"`,
    height: '100vh',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1.5fr',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  toolbar: {
    gridArea: 'toolbar',
  },
  conversations: {
    gridArea: 'conversations',
    overflowY: 'auto',
  },
  messages: {
    gridArea: 'messages',
    [theme.breakpoints.down('xs')]: {
      flexGrow: '1',
    },
  },
  input: {
    gridArea: 'input',
  },
}));

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const conversationsList = useSelector(conversationsListArraySelector);

  const history = useHistory();

  const handleNewConv = (userIds) => {
    let convoUid = checkConvExist(conversationsList, userIds);
    if (!convoUid) convoUid = createConversation([...userIds, user.uid]);
    history.push(`/conversations/${convoUid}`);
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
    <main className={classes.root}>
      {/* Desktop layout */}
      <Hidden xsDown>
        <AppBar position="static" className={classes.toolbar}>
          <Toolbar>
            <AddConversationButton handleNewConv={handleNewConv} />
            <Box ml="auto">
              <SignOut />
            </Box>
          </Toolbar>
        </AppBar>

        <Paper className={classes.conversations}>
          <ConversationList />
        </Paper>

        <Route path="/conversations/:convoUid">
          <Messages classes={classes} />
        </Route>
      </Hidden>

      {/* Mobile layout */}
      <Hidden smUp>
        <Switch>
          {/* Conversation List */}
          <Route exact path="/conversations">
            <AppBar position="static">
              <Toolbar>
                <AddConversationButton handleNewConv={handleNewConv} />
                <Box ml="auto">
                  <SignOut />
                </Box>
              </Toolbar>
            </AppBar>

            <Paper className={classes.conversations}>
              <ConversationList />
            </Paper>
          </Route>

          {/* Messages */}
          <Route path="/conversations/:convoUid">
            <AppBar position="static">
              <Toolbar>
                <Button
                  color="inherit"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    history.push('/conversations');
                  }}
                >
                  Retour
                </Button>
              </Toolbar>
            </AppBar>

            <Messages classes={classes} />
          </Route>
        </Switch>
      </Hidden>
    </main>
  );
}

export default HomePage;
