import React from 'react';
import propTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
