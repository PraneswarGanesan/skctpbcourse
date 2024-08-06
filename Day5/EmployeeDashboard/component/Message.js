import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Card, CardContent, Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const sampleUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

const sampleMessages = [
  { id: 1, from: 'John Doe', content: 'Meeting at 10 AM' },
  { id: 2, from: 'Jane Smith', content: 'System maintenance at 2 PM' },
];

const Message = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [users, setUsers] = useState(sampleUsers);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setMessages(sampleMessages);
    setUsers(sampleUsers);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMessages = selectedUser
    ? messages.filter((message) =>
        message.from === selectedUser.name
      )
    : [];

  const handleSendMessage = () => {
    if (selectedUser && newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, from: 'Admin', content: newMessage, to: selectedUser.name }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Messages
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Users
          </Typography>
          <List>
            {filteredUsers.map((user) => (
              <ListItem button key={user.id} onClick={() => setSelectedUser(user)}>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        {selectedUser && (
          <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" gutterBottom>
                Chat with {selectedUser.name}
              </Typography>
              <IconButton onClick={() => setSelectedUser(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 400, mb: 2 }}>
              <List>
                {filteredMessages.map((message) => (
                  <ListItem key={message.id}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="text.primary">
                          {message.from}:
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {message.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button variant="contained" color="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Message;
