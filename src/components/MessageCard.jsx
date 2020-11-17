import React from 'react';
import propTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Box,
  Avatar,
  CardContent,
  Typography,
} from '@material-ui/core';

function MessageCard({ name, image, message, isSelf }) {
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
          title={<Typography variant="h6">{name}</Typography>}
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
  isSelf: propTypes.bool.isRequired,
};

export default React.memo(MessageCard);
