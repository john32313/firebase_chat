import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { withStyles } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/Message';

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Avatar,
  Badge,
} from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const StatusBadge = withStyles(() => ({
  badge: {
    backgroundColor: styledBy('status', {
      online: 'rgb(76, 175, 80)',
      offline: 'rgb(244, 67, 54)',
    }),
  },
}))(Badge);

const CircleAvatarGroup = withStyles(() => ({
  avatar: {
    borderRadius: '50%',
  },
}))(AvatarGroup);

function ConversationListItem({ users, unreadCount, link }) {
  const navLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <NavLink
          activeClassName="Mui-selected"
          to={link}
          ref={ref}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...itemProps}
        />
      )),
    [link],
  );

  return (
    <li>
      <ListItem button component={navLink}>
        <ListItemAvatar>
          <CircleAvatarGroup max={4} spacing="small">
            {users.map((u) => (
              <StatusBadge
                key={u.displayName}
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
                status={u.isOnline ? 'online' : 'offline'}
              >
                <Avatar alt={u.displayName} src={u.photoURL} />
              </StatusBadge>
            ))}
          </CircleAvatarGroup>
        </ListItemAvatar>

        <ListItemText>
          {users.map((u, i) => (
            <Fragment key={u.displayName}>
              <b>{u.displayName}</b>
              {i !== users.length - 1 && ', '}
            </Fragment>
          ))}
        </ListItemText>

        <ListItemIcon>
          <Badge badgeContent={unreadCount} color="primary">
            <MessageIcon />
          </Badge>
        </ListItemIcon>
      </ListItem>
    </li>
  );
}

ConversationListItem.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      displayName: propTypes.string.isRequired,
      photoURL: propTypes.string.isRequired,
      isOnline: propTypes.bool.isRequired,
    }),
  ).isRequired,
  unreadCount: propTypes.number,
  link: propTypes.string.isRequired,
};

ConversationListItem.defaultProps = {
  unreadCount: 0,
};

export default React.memo(ConversationListItem);
