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
} from '../store/selectors';
import MessageCard from './MessageCard';
import {
  sendMessage,
  subscribeConversationMessages,
  pushUnreadUsersList,
  unsubscribeConversation,
  popUnreadConv,
} from '../utils/utilsFirebase';

function Messages({ messagesClassName, inputClassName }) {
  const { convoUid } = useParams();
  const user = useSelector(userSelector);
  const contacts = useSelector(contactsSelector);
  const usersList = useSelector(usersListConv(convoUid));

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
    return () => unsubscribeConversation(convoUid);
  }, [convoUid]);

  useEffect(() => {
    scrollRef.current.scroll(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      <Box className={messagesClassName} overflow="auto" ref={scrollRef}>
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
        className={inputClassName}
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
  messagesClassName: propTypes.string.isRequired,
  inputClassName: propTypes.string.isRequired,
};

export default Messages;
