import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Container,
  Box,
  Paper,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {
  contactsSelector,
  userSelector,
  usersListConv,
  unreadConv,
} from '../store/selectors';
import MessageCard from './MessageCard';
import {
  sendMessage,
  subscribeConversationMessages,
  pushUnreadUsersList,
  unsubscribeConversationMessages,
  popUnreadConv,
} from '../utils/utilsFirebase';

function Messages({ classes }) {
  const { convoUid } = useParams();
  const user = useSelector(userSelector);
  const contacts = useSelector(contactsSelector);
  const usersList = useSelector(usersListConv(convoUid));
  const unread = useSelector(unreadConv(convoUid));

  const scrollRef = useRef();

  const [messages, setMessages] = useState(null);

  const [newMsg, setNewMsg] = useState('');
  const handleChange = (e) => {
    setNewMsg(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMsg || !newMsg.trim()) return;
    sendMessage(convoUid, user.uid, newMsg);
    setNewMsg('');
    pushUnreadUsersList(convoUid, usersList);
  };

  useEffect(() => {
    subscribeConversationMessages(setMessages, convoUid);
    popUnreadConv(convoUid, user.uid);
    return () => unsubscribeConversationMessages(convoUid);
  }, [convoUid]);

  useEffect(() => {
    scrollRef.current.scroll(0, scrollRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    popUnreadConv(convoUid, user.uid);
  }, [unread]);

  return (
    <>
      <Box className={classes.messages} overflow="auto" ref={scrollRef}>
        {usersList && messages && (
          <Container fixed maxWidth="md">
            {messages.map((msg) => (
              <MessageCard
                key={msg.time}
                name={contacts[msg.exp].displayName}
                image={contacts[msg.exp].photoURL}
                message={msg.text}
                isSelf={user.uid === msg.exp}
              />
            ))}
          </Container>
        )}
      </Box>

      <Paper
        className={classes.input}
        elevation={0}
        square
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box p="0.5rem">
          <TextField
            id="message-input"
            label="Message"
            rowsMax={4}
            fullWidth
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              ),
            }}
            value={newMsg}
            onChange={handleChange}
          />
        </Box>
      </Paper>
    </>
  );
}
Messages.propTypes = {
  classes: propTypes.shape({
    messages: propTypes.string,
    input: propTypes.string,
  }),
};
Messages.defaultProps = {
  classes: {
    messages: '',
    input: '',
  },
};

export default Messages;
