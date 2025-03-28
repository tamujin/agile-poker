import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import SessionManager from './components/SessionManager';
import PokerCards from './components/PokerCards';
import VotingResults from './components/VotingResults';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

interface Participant {
  username: string;
  vote: string | null;
}

export default function App() {
  const [sessionId, setSessionId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleCreateSession = (name: string) => {
    setUsername(name);
    setIsHost(true);
    setSessionId(Math.random().toString(36).substring(2, 8).toUpperCase());
    setParticipants([{ username: name, vote: null }]);
  };

  const handleJoinSession = (name: string, session: string) => {
    setUsername(name);
    setSessionId(session);
    setParticipants(prev => [...prev, { username: name, vote: null }]);
  };

  const handleCardSelect = (value: string) => {
    setSelectedCard(value);
    setParticipants(prev =>
      prev.map(p =>
        p.username === username ? { ...p, vote: value } : p
      )
    );
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setSelectedCard('');
    setParticipants(prev =>
      prev.map(p => ({ ...p, vote: null }))
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Agile Poker
          </Typography>

          {!sessionId && (
            <SessionManager
              onCreateSession={handleCreateSession}
              onJoinSession={handleJoinSession}
            />
          )}

          {sessionId && (
            <>
              <VotingResults
                participants={participants}
                isRevealed={isRevealed}
                sessionId={sessionId}
              />
              
              <PokerCards
                onSelectCard={handleCardSelect}
                selectedValue={selectedCard}
                isRevealMode={isRevealed}
              />

              {isHost && (
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReveal}
                    disabled={isRevealed}
                  >
                    Reveal Cards
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                    disabled={!isRevealed}
                  >
                    Start New Round
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
