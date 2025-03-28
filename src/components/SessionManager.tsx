import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Divider
} from '@mui/material';

interface SessionManagerProps {
  onJoinSession: (username: string, sessionId: string) => void;
  onCreateSession: (username: string) => void;
}

export default function SessionManager({ onJoinSession, onCreateSession }: SessionManagerProps) {
  const [username, setUsername] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleCreateSession = () => {
    if (username.trim()) {
      onCreateSession(username.trim());
    }
  };

  const handleJoinSession = () => {
    if (username.trim() && sessionId.trim()) {
      onJoinSession(username.trim(), sessionId.trim());
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%'
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Join or Create Session
          </Typography>
          
          <TextField
            fullWidth
            label="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <Divider>OR</Divider>
          
          <Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateSession}
              disabled={!username.trim()}
            >
              Create New Session
            </Button>
          </Box>
          
          <Divider>OR</Divider>
          
          <TextField
            fullWidth
            label="Session ID"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            required
          />
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleJoinSession}
            disabled={!username.trim() || !sessionId.trim()}
          >
            Join Existing Session
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}