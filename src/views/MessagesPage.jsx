import React from 'react';
import { Route } from 'react-router-dom';

import Messages from '../components/Messages';
import ConversationList from '../components/ConversationList';

function MessagesPage() {
  return (
    <main className="flex">
      <ConversationList />
      <Route path="/messages/:convoUid">
        <Messages />
      </Route>
    </main>
  );
}

export default MessagesPage;
