import { Box, Paper, Typography, Grid, Chip, Divider } from '@mui/material';

interface Participant {
  username: string;
  vote: string | null;
}

interface VotingResultsProps {
  participants: Participant[];
  isRevealed: boolean;
  sessionId: string;
}

export default function VotingResults({ participants, isRevealed, sessionId }: VotingResultsProps) {
  const calculateConsensus = () => {
    const votes = participants
      .map(p => p.vote)
      .filter((vote): vote is string => vote !== null && vote !== '?');
    
    if (votes.length === 0) return null;
    
    // Convert string numbers to actual numbers for calculation
    const numericVotes = votes.map(v => parseInt(v));
    const average = numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length;
    
    // Find the closest Fibonacci number to the average
    const fibSequence = [0, 1, 2, 3, 5, 8, 13, 21, 34];
    return fibSequence.reduce((prev, curr) => {
      return Math.abs(curr - average) < Math.abs(prev - average) ? curr : prev;
    }).toString();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Session ID: {sessionId}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Participants ({participants.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {participants.map((participant, index) => (
                <Chip
                  key={index}
                  label={`${participant.username} ${isRevealed && participant.vote ? `: ${participant.vote}` : ''}`}
                  color={participant.vote ? 'primary' : 'default'}
                  variant={participant.vote ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
          
          {isRevealed && (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Consensus: {calculateConsensus() || 'No valid votes'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}