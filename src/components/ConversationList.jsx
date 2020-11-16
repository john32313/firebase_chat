import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {
  contactsSelector,
  conversationsListArraySelector,
  userSelector,
} from '../store/selectors';
import ConversationListItem from './ConversationListItem';

function ConversationList() {
  const user = useSelector(userSelector);
  const contacts = useSelector(contactsSelector);
  const conversationsList = useSelector(conversationsListArraySelector);

  return (
    <List>
      {conversationsList.map((convo, i) => {
        const contact = convo.userList
          .filter((uid) => uid !== user.uid) // Exclude self from contact list
          .map((uid) => contacts[uid]);

        return (
          <>
            <ConversationListItem
              key={convo.uid_conv}
              users={contact}
              unreadCount={convo.unread}
              link={`/messages/${convo.uid_conv}`}
            />
            {i !== conversationsList.length - 1 && <Divider component="li" />}
          </>
        );
      })}
    </List>
  );
}

export default ConversationList;
