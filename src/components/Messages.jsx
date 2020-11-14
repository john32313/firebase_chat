/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSelector } from '../store/selectors';
import { useSubscribeConversation } from '../utils/utilsConversation';
import { createMessage } from '../utils/utilsFirebase';
import MessageBubble from './MessageBubble';

function Messages() {
  const { convoUid } = useParams();
  const user = useSelector(userSelector);

  const [conversation, userList] = useSubscribeConversation(convoUid);

  const [newMsg, setNewMsg] = useState('');

  const handleChange = (e) => {
    setNewMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMsg || !newMsg.trim()) return;
    createMessage(convoUid, user.uid, newMsg);
    setNewMsg('');
  };

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-screen overflow-y-auto p-3">
      <ul>
        {userList &&
          conversation &&
          conversation.map((msg) => (
            <MessageBubble
              key={msg.time}
              name={userList[msg.exp]?.displayName ?? 'anonymous'}
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
