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
import MenuIcon from '@mui/icons-material/Menu';
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
    const [hoveredMenu, setHoveredMenu] = React.useState<string | null>(null);

    const toggleDrawer = () => {
        setOpen((prev) => !prev);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if (!open) {
            setAnchorEl(event.currentTarget);
            setSubmenuOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!open && !anchorEl) {
            setSubmenuOpen(false);
        }
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
            <Drawer variant="permanent" open={open}>
                <Divider />
                <List>
                    <ListItem
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton onClick={() => setSubmenuOpen((prev) => !prev)}>
                            <ListItemIcon sx={{ mr: open ? 1 : 0 }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="User" sx={{ opacity: open ? 1 : 0 }} />
                            {submenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            {/* <ExpandMoreIcon
        sx={{
            transform: submenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease', // Smooth rotation
        }}
    /> */}
                        </ListItemButton>

                        <Collapse in={open && submenuOpen} >
                            <List component="div" disablePadding>
                                {submenuItems.map((item, index) => (
                                    <ListItemButton
                                        key={index}
                                        sx={{ pl: 4 }}
                                        onMouseEnter={() => handleMenuItemHover(item)}
                                        onMouseLeave={handleMenuItemLeave}
                                    >
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
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
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        onClick={toggleDrawer}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Custom Drawer
                    </Typography>
                </Toolbar>
                <Typography>
                    Content goes here...
                </Typography>
            </Box>
        </Box>
    );
}