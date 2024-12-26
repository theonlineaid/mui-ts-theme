import * as React from 'react';
import Switch from '@mui/material/Switch';
import useSettings from '../../../hooks/useSettings';

// Define the type for the event in handleChange
const ModeSwitch: React.FC = () => {
  const { themeMode, onToggleMode } = useSettings();

  // Explicitly define the type of the event for the onChange handler
  // event: React.ChangeEvent<HTMLInputElement>
  const handleChange = () => {
    onToggleMode();
  };

  return (
    <Switch
      checked={themeMode === 'dark'}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'theme-switch' }}
    />
  );
};

export default ModeSwitch;
