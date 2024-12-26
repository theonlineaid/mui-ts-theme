import { FC } from 'react';
import { Icon } from '@iconify/react';  // Import Icon component from @iconify/react
import { Box, SxProps, Theme } from '@mui/material'; // Import necessary MUI components
import { IconifyIcon } from '@iconify/types'; // Import types from @iconify/types

// Define the component props type
interface IconifyProps {
  icon: IconifyIcon | string; // The icon can be either an IconifyIcon or a string (icon name)
  sx?: SxProps<Theme>; // The sx prop for styling, optional
  [key: string]: any; // Allows any additional props to be passed
}

const Iconify: FC<IconifyProps> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default Iconify;
