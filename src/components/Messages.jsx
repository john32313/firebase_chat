import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

function Messages() {
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
    <Box display="flex" flexDirection="column" height="calc(100vh - 64px)">
      <Box flexGrow="1" height="100%" overflow="auto" ref={scrollRef}>
        <Container fixed maxWidth="md">
          {usersList &&
            messages &&
            messages.map((msg) => (
              <MessageCard
                key={msg.time}
                name={contacts[msg.exp].displayName}
                image={contacts[msg.exp].photoURL}
                message={msg.text}
                isSelf={user.uid === msg.exp}
              />
            ))}
        </Container>
      </Box>

      <Paper
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
    </Box>
  );
}

export default Messages;
