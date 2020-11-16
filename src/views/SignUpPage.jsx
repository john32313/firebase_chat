import React from 'react';
import { Box, Paper } from '@material-ui/core';
import SignIn from '../components/SignIn';

function SignUpPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper>
        <SignIn />
      </Paper>
    </Box>
  );
}

export default SignUpPage;
