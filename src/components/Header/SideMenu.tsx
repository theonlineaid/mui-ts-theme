import React from "react";
import {
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";
import Android from "@mui/icons-material/Android";
import Html from "@mui/icons-material/Html";
import Code from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import BuildIcon from "@mui/icons-material/Build";
import StorageIcon from "@mui/icons-material/Storage";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// Sample menu items
const menuItems = [
    { icon: <Android fontSize="small" />, text: "Android Development" },
    { icon: <Html fontSize="small" />, text: "Web Development" },
    { icon: <Code fontSize="small" />, text: "Algorithms" },
    { icon: <WebIcon fontSize="small" />, text: "Frontend Development" },
    { icon: <BuildIcon fontSize="small" />, text: "Backend Development" },
    { icon: <StorageIcon fontSize="small" />, text: "Database Management" },
];

// Generate 30+ menu items dynamically
const fullMenu = Array.from({ length: 30 }, (_, i) => ({
    icon: menuItems[i % menuItems.length].icon,
    text: `${menuItems[i % menuItems.length].text} ${i + 1}`,
}));

export default function SideMenu() {
    return (
   
            <SimpleBar
                style={{
                    maxHeight: "93vh",
                }}
                forceVisible="y"
                autoHide={false}
            >
                <MenuList>
                    {fullMenu.map((item, index) => (
                        <MenuItem key={index}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </SimpleBar>

    );
}
