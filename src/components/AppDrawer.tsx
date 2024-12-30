import * as React from 'react';
import {
    Box,
    Typography,
    CssBaseline,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
    Popper,
    Collapse,
} from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

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
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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
    const [open, setOpen] = React.useState(false);
    const [submenuOpen, setSubmenuOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubmenuClick = () => {
        setSubmenuOpen((prev) => !prev);
    };

    const handleMouseEnter = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        if (!open) {
            setAnchorEl(event.currentTarget);
            setSubmenuOpen(true); // Open submenu on hover
        }
    };

    const handleMouseLeave = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        if (!open) {
            setAnchorEl(event.currentTarget);
            setSubmenuOpen(true); // Open submenu on hover
        }
    };

    const submenuItems = ['Profile', 'Cards', 'List', 'Create', 'Edit', 'Account'];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Custom Drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton onClick={handleSubmenuClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="User" sx={{ opacity: open ? 1 : 0 }} />
                            {submenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        
                        <Collapse in={open && submenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {submenuItems.map((item, index) => (
                                    <ListItemButton key={index} sx={{ pl: 4 }}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </Drawer>
            
            {/* Popper to show the submenu items when hovering over the drawer (in mini state) */}
            <Popper
                open={!open && Boolean(anchorEl) && submenuOpen} // Keep the Popper open on hover
                anchorEl={anchorEl}
                placement="right-start"
                disablePortal={false} // So the Popper is part of the DOM tree, not moved to a separate node
                style={{ zIndex: theme.zIndex.drawer + 1 }}
            >
                <Paper sx={{ padding: 1, minWidth: 120, boxShadow: theme.shadows[3] }}>
                    {submenuItems.map((submenuItem, index) => (
                        <Typography
                            key={index}
                            sx={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: theme.palette.action.hover },
                            }}
                        >
                            {submenuItem}
                        </Typography>
                    ))}
                </Paper>
            </Popper>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography>
                    Content goes here...
                </Typography>
            </Box>
        </Box>
    );
}
