/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSelector } from '../store/selectors';
import { useSubscribeConversation } from '../utils/utilsConversation';
import MessageBubble from './MessageBubble';

function Messages() {
  const { convoUid } = useParams();
  const user = useSelector(userSelector);

  const [conversation, userList] = useSubscribeConversation(convoUid);

  return (
    <ul className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-screen overflow-y-auto p-3">
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
  );
}

export default Messages;
