// material-ui
import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

// project-imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import { Moon, Setting2, Sun1 } from 'iconsax-react';

// ==============================|| AXK INSURANCE - THEME MODE SELECTOR ||============================== //

export default function ThemeModeLayout() {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  // AXK Insurance brand colors
  const axkColors = {
    primary: '#2aa1af',   // Teal primary
    secondary: '#3cbbc9', // Lighter teal
    dark: '#1d8a97'       // Darker teal
  };

  const handleModeChange = (event) => {
    onChangeMode(event.target.value);
  };

  // Get active color based on theme mode
  const getActiveColor = () => {
    return theme.palette.mode === 'dark' ? axkColors.secondary : axkColors.primary;
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Decorative background hexagonal pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          left: -15,
          right: -15,
          bottom: -10,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V0C4.477 0 0 4.477 0 10v30zm22 0c-5.523 0-10-4.477-10-10V0c5.523 0 10 4.477 10 10v30z' fill='%23${axkColors.primary.substring(1)}' fill-opacity='0.8' fillRule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px',
          zIndex: -1,
          borderRadius: '12px',
        }}
      />

      <RadioGroup
        row
        aria-label="theme-mode"
        name="theme-mode"
        value={mode}
        onChange={handleModeChange}
        sx={{
          background: theme.palette.mode === 'dark'
            ? alpha(axkColors.dark, 0.05)
            : alpha(axkColors.primary, 0.03),
          borderRadius: '12px',
          p: 1.5
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <FormControlLabel
            control={<Radio value={ThemeMode.LIGHT} sx={{ display: 'none' }} />}
            sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <Stack alignItems="center" spacing={0.8}>
                <MainCard
                  content={false}
                  sx={{
                    width: '100%',
                    borderWidth: 2,
                    p: 1.5,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: mode === ThemeMode.LIGHT
                      ? `0 4px 12px ${alpha(axkColors.primary, 0.35)}`
                      : 'none',
                    ...(mode === ThemeMode.LIGHT && {
                      borderColor: axkColors.primary,
                      background: alpha(axkColors.primary, 0.08)
                    }),
                    ...(!mode === ThemeMode.LIGHT && {
                      borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200'
                    }),
                    '&:hover': {
                      borderColor: alpha(axkColors.primary, 0.5),
                      boxShadow: `0 4px 12px ${alpha(axkColors.primary, 0.2)}`
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                    <Sun1
                      variant="Bold"
                      color={mode === ThemeMode.LIGHT ? axkColors.primary : theme.palette.mode === 'dark' ? 'white' : '#666'}
                      size={24}
                    />
                  </Stack>
                </MainCard>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: mode === ThemeMode.LIGHT ? 600 : 400,
                    color: mode === ThemeMode.LIGHT ? axkColors.primary : 'inherit'
                  }}
                >
                  Light
                </Typography>
              </Stack>
            }
          />
          <FormControlLabel
            control={<Radio value={ThemeMode.DARK} sx={{ display: 'none' }} />}
            sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <Stack alignItems="center" spacing={0.8}>
                <MainCard
                  content={false}
                  sx={{
                    width: '100%',
                    borderWidth: 2,
                    p: 1.5,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: mode === ThemeMode.DARK
                      ? `0 4px 12px ${alpha(axkColors.primary, 0.35)}`
                      : 'none',
                    ...(mode === ThemeMode.DARK && {
                      borderColor: axkColors.primary,
                      background: alpha(axkColors.primary, 0.08)
                    }),
                    ...(!mode === ThemeMode.DARK && {
                      borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200'
                    }),
                    '&:hover': {
                      borderColor: alpha(axkColors.primary, 0.5),
                      boxShadow: `0 4px 12px ${alpha(axkColors.primary, 0.2)}`
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                    <Moon
                      variant="Bold"
                      color={mode === ThemeMode.DARK ? axkColors.primary : theme.palette.mode === 'dark' ? 'white' : '#666'}
                      size={22}
                    />
                  </Stack>
                </MainCard>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: mode === ThemeMode.DARK ? 600 : 400,
                    color: mode === ThemeMode.DARK ? axkColors.primary : 'inherit'
                  }}
                >
                  Dark
                </Typography>
              </Stack>
            }
          />
          <FormControlLabel
            control={<Radio value={ThemeMode.AUTO} sx={{ display: 'none' }} />}
            sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <Stack alignItems="center" spacing={0.8}>
                <MainCard
                  content={false}
                  sx={{
                    width: '100%',
                    borderWidth: 2,
                    p: 1.5,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: mode === ThemeMode.AUTO
                      ? `0 4px 12px ${alpha(axkColors.primary, 0.35)}`
                      : 'none',
                    ...(mode === ThemeMode.AUTO && {
                      borderColor: axkColors.primary,
                      background: alpha(axkColors.primary, 0.08)
                    }),
                    ...(!mode === ThemeMode.AUTO && {
                      borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200'
                    }),
                    '&:hover': {
                      borderColor: alpha(axkColors.primary, 0.5),
                      boxShadow: `0 4px 12px ${alpha(axkColors.primary, 0.2)}`
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                    <Setting2
                      variant="Bold"
                      color={mode === ThemeMode.AUTO ? axkColors.primary : theme.palette.mode === 'dark' ? 'white' : '#666'}
                      size={22}
                    />
                  </Stack>
                </MainCard>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: mode === ThemeMode.AUTO ? 600 : 400,
                    color: mode === ThemeMode.AUTO ? axkColors.primary : 'inherit'
                  }}
                >
                  Auto
                </Typography>
              </Stack>
            }
          />
        </Stack>
      </RadioGroup>
    </Box>
  );
}