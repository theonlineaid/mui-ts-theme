import React from "react";
import {IconButton, Badge } from "@mui/material";
import { Search, Language, Notifications, Settings, AccountCircle, MoreVert } from "@mui/icons-material";

const Options: React.FC = () => {
    return (
        <>
            <IconButton color="inherit">
                <Search />
            </IconButton>
            <IconButton color="inherit">
                <Language />
            </IconButton>
            <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                    <Notifications />
                </Badge>
            </IconButton>
            <IconButton color="inherit">
                <Settings />
            </IconButton>
            <IconButton color="inherit">
                <AccountCircle />
            </IconButton>
            <IconButton color="inherit">
                <MoreVert />
            </IconButton>
        </>
    );
};

export default Options;
