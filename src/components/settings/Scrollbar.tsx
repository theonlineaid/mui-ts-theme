import { FC, ReactNode } from 'react';
import SimpleBar from "simplebar-react";
import { Theme, useMediaQuery } from '@mui/material';

interface ScrollbarProps {
  children: ReactNode;
}

// ----------------------------------------------------------------------

const Scrollbar: FC<ScrollbarProps> = ({ children }: ScrollbarProps) => {
  // Using MUI's useMediaQuery hook to determine if the screen is mobile
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <SimpleBar
      style={{
        maxHeight: isMobile ? '85vh' : '90vh', // 85vh for mobile, 90vh for larger screens
      }}
      forceVisible="y"
      autoHide={true}
    >
      {children}
    </SimpleBar>
  );
}

export default Scrollbar;
