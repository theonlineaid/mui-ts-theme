import React, { useCallback, useMemo, useEffect, useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fade } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Scrollbar from "./settings/Scrollbar";

interface CustomDialogProps {
    title: string;
    isDraggable?: boolean;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    isFullScreenButtonVisible?: boolean;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    onFullScreenChange?: (isFullScreen: boolean) => void;
    fullScreen?: boolean;
    height?: string | number; // New prop for setting specific height for small modals
}

const PaperComponent: React.FC = (props) => (
    <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
        defaultPosition={{ x: window.innerWidth / 2 - 200, y: 50 }}
    >
        <Paper {...props} />
    </Draggable>
);

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>
) {
    return <Fade {...props} ref={ref} timeout={500} />;
});

const CustomDialog: React.FC<CustomDialogProps> = ({
    title,
    isDraggable = false,
    maxWidth = "md",
    isFullScreenButtonVisible = true,
    children,
    open,
    onClose,
    onFullScreenChange,
    fullScreen = false,
    height = "auto", // Default height is 'auto'
}) => {
    const [isFullScreen, setIsFullScreen] = useState(fullScreen);

    useEffect(() => {
        setIsFullScreen(fullScreen);
    }, [fullScreen]);

    const handleFullscreen = useCallback(() => {
        setIsFullScreen((prev) => {
            const newFullScreenState = !prev;
            if (onFullScreenChange) {
                onFullScreenChange(newFullScreenState);
            }
            return newFullScreenState;
        });
    }, [onFullScreenChange]);

    const handleClose = () => {
        setIsFullScreen(false);
        if (onFullScreenChange) {
            onFullScreenChange(false);
        }
        onClose();
    };

    const dialogTitleStyle = useMemo(
        () => ({
            cursor: isDraggable && !isFullScreen ? "move" : "default",
            padding: "0",
        }),
        [isDraggable, isFullScreen]
    );

    // Set dynamic styles for the modal height based on fullscreen state
    const headerHeight = 50; // Fixed header height

    const dialogStyles = useMemo(() => ({
        height: isFullScreen ? `calc(97vh - ${headerHeight}px)` : height, // Subtract header height in fullscreen
        maxHeight: isFullScreen ? `calc(97vh - ${headerHeight}px)` : "none", // Prevent fullscreen dialog from exceeding viewport height
    }), [isFullScreen, height]);

    return (
        <Dialog
            fullScreen={isFullScreen}
            fullWidth
            maxWidth={isFullScreen ? undefined : maxWidth}
            open={open}
            onClose={handleClose}
            PaperComponent={isDraggable && !isFullScreen ? PaperComponent : undefined}
            TransitionComponent={Transition}
            disableEscapeKeyDown
            aria-labelledby="draggable-dialog-title"
            sx={{
                "& .MuiDialog-paper": {
                    position: "absolute",
                    top: isFullScreen ? "0%" : "5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: isFullScreen ? "0" : "0%",
                },
            }}
        >
            <Box p={1}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                        height: headerHeight,
                    }}
                >
                    <DialogTitle
                        style={dialogTitleStyle}
                        id="draggable-dialog-title"
                        sx={{ width: "80%" }}
                    >
                        {title}
                    </DialogTitle>
                    <Box sx={{ width: "20%", textAlign: "right" }}>
                        {isFullScreenButtonVisible && (
                            <IconButton aria-label="fullscreen" onClick={handleFullscreen}>
                                <FullscreenIcon />
                            </IconButton>
                        )}
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Scrollbar>
                    <DialogContent sx={{ p: 0 }} style={dialogStyles as React.CSSProperties}>
                        {children}
                    </DialogContent>
                </Scrollbar>
            </Box>
        </Dialog>
    );
};

export default React.memo(CustomDialog);
