import { FC, ReactNode } from 'react';
import SimpleBarReact from 'simplebar-react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflowY: 'scroll',

  // Thumb (the draggable part) styles
  '&::-webkit-scrollbar-button': {
    display: 'none',
    width: 0,
    height: 0
  },

  scrollbarWidth: 'thin',
}));


const SimpleBarStyle = styled(SimpleBarReact)(() => ({
  "& .simplebar-placeholder": {
    height: '0 !important',
    borderRadius: 10,
  }
}));

// ----------------------------------------------------------------------

interface ScrollbarProps {
  children: ReactNode; // The children can be any valid ReactNode
  sx?: SxProps<Theme>; // Style prop with MUI theme support
}

// ----------------------------------------------------------------------

const Scrollbar: FC<ScrollbarProps> = ({ children, sx, ...other }) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}

export { SimpleBarStyle };
export default Scrollbar;