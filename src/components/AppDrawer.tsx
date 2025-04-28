import * as React from 'react';
import {
    Box,
    Typography,
    CssBaseline,
    Toolbar,
    IconButton,
    AppBar,
    Paper,
    Popper
} from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Options from './Header/Options';
import SideMenu from './Header/SideMenu';
import SideBarLogo from './Header/SideBarLogo';
import CustomDialog from './CustomDialog';
import SearchRoute from './Header/SearchRoute';

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(11)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function AppDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [submenuOpen, setSubmenuOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [hoveredMenu, setHoveredMenu] = React.useState<string | null>(null);
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const toggleDrawer = () => {
        setOpen((prev) => !prev);
    };


    const handleMenuItemHover = (item: string) => {
        setHoveredMenu(item);
    };

    const handleMenuItemLeave = () => {
        setHoveredMenu(null);
    };

    const submenuItems = ['Profile', 'Cards', 'List', 'Create', 'Edit', 'Account'];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}
                sx={{
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        height: "100vh",  // Make sure drawer takes full height
                        overflowY: "hidden",  // Hide the overflow outside the drawer
                    },
                }}

            >
                <SideBarLogo />
                <SideMenu />
            </Drawer>

            {/* Popper for mini drawer */}
            <Popper
                open={!open && Boolean(anchorEl) && submenuOpen}
                anchorEl={anchorEl}
                placement="right-start"
                onMouseEnter={() => setSubmenuOpen(true)}
                onMouseLeave={() => setSubmenuOpen(false)}
                style={{ zIndex: theme.zIndex.drawer + 1, width: 220 }}
            >
                <Paper sx={{ padding: 1, minWidth: 120, boxShadow: theme.shadows[3] }}>
                    {submenuItems.map((submenuItem, index) => (
                        <Typography
                            key={index}
                            onMouseEnter={() => handleMenuItemHover(submenuItem)}
                            onMouseLeave={handleMenuItemLeave}
                            sx={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                backgroundColor:
                                    hoveredMenu === submenuItem
                                        ? theme.palette.action.hover
                                        : 'transparent',
                            }}
                        >
                            {submenuItem}
                        </Typography>
                    ))}
                </Paper>
            </Popper>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <AppBar position="static"
                // sx={{
                //     backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
                //     color: theme.palette.mode === "dark" ? "#fff" : "#000",
                // }}
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <IconButton
                            color="inherit"
                            aria-label="toggle drawer"
                            onClick={toggleDrawer}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box>
                            <Options onSearchClick={handleOpenDialog} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Custom Dialog */}
            <CustomDialog
                title="Search"
                open={isDialogOpen}
                onClose={handleCloseDialog}
                maxWidth="sm"
                height="400px"
                isFullScreenButtonVisible={false}
            // isDraggable={true}
            >
                <SearchRoute />
            </CustomDialog>
        </Box>
    );
}