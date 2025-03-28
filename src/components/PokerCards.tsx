import { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

interface PokerCardsProps {
  onSelectCard: (value: string) => void;
  selectedValue?: string;
  isRevealMode?: boolean;
}

const CARD_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '?'];

export default function PokerCards({ onSelectCard, selectedValue, isRevealMode = false }: PokerCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {CARD_VALUES.map((value) => (
          <Grid item key={value}>
            <Paper
              elevation={hoveredCard === value ? 8 : 2}
              sx={{
                width: 80,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isRevealMode ? 'default' : 'pointer',
                backgroundColor: selectedValue === value ? 'primary.main' : 'background.paper',
                color: selectedValue === value ? 'primary.contrastText' : 'text.primary',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: isRevealMode ? 'none' : 'translateY(-8px)',
                  backgroundColor: selectedValue === value ? 'primary.main' : 'action.hover'
                }
              }}
              onMouseEnter={() => setHoveredCard(value)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => !isRevealMode && onSelectCard(value)}
            >
              <Typography variant="h4" component="span">
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}