import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { List, Divider } from '@material-ui/core';
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
          <Fragment key={convo.uid_conv}>
            <ConversationListItem
              users={contact}
              unreadCount={convo.unread}
              link={`/conversations/${convo.uid_conv}`}
            />
            {i !== conversationsList.length - 1 && <Divider component="li" />}
          </Fragment>
        );
      })}
    </List>
  );
}

export default ConversationList;
