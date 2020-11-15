/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  contactsSelector,
  userSelector,
  usersListConv,
} from '../store/selectors';
import MessageBubble from './MessageBubble';
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

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-screen overflow-y-auto p-3">
      <ul>
        {usersList &&
          messages &&
          messages.map((msg) => (
            <MessageBubble
              key={msg.time}
              name={contacts[msg.exp].displayName}
              message={msg.text}
              isSelf={user.uid === msg.exp}
            />
          ))}
      </ul>

      <form onSubmit={handleSubmit} className="my-5">
        <label>
          <input
            value={newMsg}
            onChange={handleChange}
            type="text"
            name="msg"
            id="msg"
            className="mt-1 p-4 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            placeholder="Enter your message"
          />
        </label>
      </form>
    </div>
  );
}

export default Messages;
