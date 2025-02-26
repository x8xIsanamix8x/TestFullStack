// src/components/SummaryCard.tsx
import { Paper, Box, Typography } from '@mui/material';

interface SummaryCardProps {
  title: string;
  value: number | string;
  percentage: string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, percentage, color }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e5e7eb' }}>
      <Box>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: color, color: 'white', py: 0.5, px: 2, borderRadius: 4, fontSize: '0.875rem' }}>
        {percentage}
      </Box>
    </Paper>
  );
};

export default SummaryCard;