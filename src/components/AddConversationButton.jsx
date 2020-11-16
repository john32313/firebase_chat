import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

function AddConversationButton() {
  return (
    <Button color="inherit" startIcon={<AddIcon />}>
      Ajouter une conversation
    </Button>
  );
}

export default AddConversationButton;
