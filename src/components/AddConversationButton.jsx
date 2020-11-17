import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  MenuItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
  Box,
} from '@material-ui/core';
import { contactsSelector } from '../store/selectors';

function AddConversationButton() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userIds, setUserIds] = useState([]);

  const contacts = useSelector(contactsSelector);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAddConversation = () => {
    setOpenDialog(false);
  };

  const selectRenderValueChips = useCallback(
    (userIds_) => (
      <Box display="flex" flexWrap="wrap">
        {userIds_.map((userId) => {
          const contact = contacts[userId];

          return (
            <Chip
              key={userId}
              label={contact.displayName}
              avatar={
                <Avatar src={contact.photoURL} alt={contact.displayName} />
              }
            />
          );
        })}
      </Box>
    ),
    [contacts],
  );

  return (
    <>
      <Button color="inherit" startIcon={<AddIcon />} onClick={handleOpen}>
        Ajouter une conversation
      </Button>

      <Dialog open={openDialog} onClose={handleClose} fullWidth>
        <DialogTitle>Ajouter une conversation</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth>
              <InputLabel id="add-conversation-select-label">
                Participants
              </InputLabel>
              <Select
                labelId="add-conversation-select-label"
                id="add-conversation-select"
                value={userIds}
                multiple
                fullWidth
                autoWidth
                MenuProps={{ variant: 'menu' }}
                renderValue={selectRenderValueChips}
                onChange={(e) => {
                  setUserIds(e.target.value);
                }}
              >
                {Object.entries(contacts).map(([uid, contact]) => (
                  <MenuItem key={uid} value={uid}>
                    <ListItemAvatar>
                      <Avatar
                        src={contact.photoURL}
                        alt={contact.displayName}
                      />
                    </ListItemAvatar>
                    <ListItemText>{contact.displayName}</ListItemText>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuler
          </Button>
          <Button onClick={handleAddConversation} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddConversationButton;
