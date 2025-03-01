import { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import ThemeModeComponent from './ThemeMode';

// AxkInsurance brand colors
const axkColors = {
    primary: '#2aa1af',   // Teal primary
    secondary: '#3cbbc9', // Lighter teal
    dark: '#1d8a97'       // Darker teal
};

export default function ThemeToggler() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(theme.palette.mode);

    useEffect(() => {
        // console.log('Theme mode changed:', theme.palette.mode);
        // console.log('Current state mode:', mode);
        setMode(theme.palette.mode);
    }, [theme.palette.mode]);

    const handleToggle = () => {
        // console.log('Drawer toggled. Current state:', !open);
        setOpen(!open);
    };

    const handleModeChange = (newMode) => {
        // console.log('Mode changing from', mode, 'to', newMode);
        setMode(newMode);
    };

    const themeMode = useMemo(() => (
        <ThemeModeComponent
            currentMode={mode}
            onChange={handleModeChange}
        />
    ), [mode]);

    const getIcon = () => {
        // console.log('Getting icon for mode:', mode);
        switch (mode) {
            case 'dark':
                return <DarkModeIcon sx={{ fontSize: 28 }} />;
            case 'system':
                return <SettingsBrightnessIcon sx={{ fontSize: 28 }} />;
            case 'light':
                return <LightModeIcon sx={{ fontSize: 28 }} />;
            default:
                console.log('Unknown mode:', mode);
                return <LightModeIcon sx={{ fontSize: 28 }} />;
        }
    };

    return (
        <>
            <Fab
                onClick={handleToggle}
                size="large"
                variant="circular"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1200,
                    background: `linear-gradient(135deg, ${axkColors.secondary} 0%, ${axkColors.primary} 100%)`,
                    color: 'white',
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                        background: `linear-gradient(135deg, ${axkColors.primary} 0%, ${axkColors.dark} 100%)`,
                    },
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                {getIcon()}
            </Fab>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleToggle}
                PaperProps={{
                    sx: {
                        width: 300,
                        padding: 3,
                        bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        boxShadow: theme.shadows[5],
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        '& .MuiTypography-root': {
                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                        },
                        '& .MuiDivider-root': {
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                        },
                    },
                }}
            >
                <Stack spacing={3}>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            color: `${axkColors.primary} !important`,
                            fontWeight: 600
                        }}
                    >
                        Theme Settings
                    </Typography>
                    <Divider />
                    <Box>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{
                                opacity: 0.8,
                                mb: 2
                            }}
                        >
                            Choose Theme Mode
                        </Typography>
                        <Box
                            sx={{
                                mt: 2,
                                '& .MuiIconButton-root': {
                                    transition: 'all 0.3s ease-in-out',
                                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                                    '&.active': {
                                        background: `linear-gradient(135deg, ${axkColors.secondary} 0%, ${axkColors.primary} 100%)`,
                                        color: 'white',
                                        transform: 'scale(1.05)',
                                    },
                                    '&:hover:not(.active)': {
                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                                    },
                                },
                            }}
                        >
                            {themeMode}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 4
                        }}
                    >
                        <Box sx={{ color: axkColors.primary, mb: 1 }}>
                            {getIcon()}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.8
                            }}
                        >
                            Currently using {theme.palette.mode} mode
                        </Typography>
                    </Box>
                </Stack>
            </Drawer>
        </>
    );
}