import React, { useEffect, useState, useCallback } from 'react';
import propTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Box,
  Avatar,
  CardContent,
  Typography,
} from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function MessageCard({ name, image, message, date, isSelf }) {
  const [timeRelative, setTimeRelative] = useState('');

  const updateTimeRelative = useCallback(() => {
    const timeRelativeLowercase = formatDistanceToNow(date, {
      locale: fr,
      addSuffix: true,
      includeSeconds: true,
    });

    setTimeRelative(
      timeRelativeLowercase[0].toUpperCase() + timeRelativeLowercase.slice(1),
    );
  });

  useEffect(() => {
    updateTimeRelative();
    const interval = setInterval(updateTimeRelative, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <Box
      ml={isSelf ? 'auto' : 'none'}
      mr={isSelf ? 'none' : 'auto'}
      my="0.5rem"
      maxWidth="24rem"
    >
      <Card>
        <CardHeader
          avatar={<Avatar alt={name} src={image} />}
          title={name}
          titleTypographyProps={{ variant: 'h6' }}
          subheader={timeRelative}
        />
        <CardContent>
          <Typography component="p">{message}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

MessageCard.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  date: propTypes.instanceOf(Date).isRequired,
  isSelf: propTypes.bool.isRequired,
};

export default MessageCard;
