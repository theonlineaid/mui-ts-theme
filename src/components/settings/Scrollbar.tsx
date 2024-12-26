import { FC, ReactNode } from 'react';
import SimpleBarReact from 'simplebar-react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflowY: 'scroll',
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  // maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
  "& .simplebar-placeholder": {
    height: '0 !important',
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
