// components/GhostNumber.tsx
import { Box } from '@mui/material';

interface GhostNumberProps {
  number: string;
  left?: string | number;
  top?: string | number;
}

const GhostNumber = ({ number, left = '-10px', top = '-20px' }: GhostNumberProps) => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'absolute',
      fontSize: { lg: '200px', xs: '100px' },
      fontWeight: 900,
      lineHeight: 1,
      opacity: 0.04,
      color: 'white',
      userSelect: 'none',
      zIndex: 0,
      pointerEvents: 'none',
      top,
      left,
      whiteSpace: 'nowrap',
    }}
  >
    {number}
  </Box>
);

export default GhostNumber;
