import React from "react";
import { IconButton, Badge } from "@mui/material";
import { Search, Language, Notifications, Settings, AccountCircle, MoreVert } from "@mui/icons-material";

// Define the props interface
interface OptionsProps {
    onSearchClick: () => void; // Function type for the search click event
}

const Options: React.FC<OptionsProps> = ({ onSearchClick }) => {
    return (
        <>
            <IconButton color="inherit" onClick={onSearchClick}>
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
