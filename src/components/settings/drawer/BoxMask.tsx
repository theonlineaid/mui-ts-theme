import { FC } from 'react';
import { Radio, FormControlLabel } from '@mui/material';

// Define the component props type
interface BoxMaskProps {
  value: string; // The value for the FormControlLabel component
}

const BoxMask: FC<BoxMaskProps> = ({ value }) => {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
};

export default BoxMask;
