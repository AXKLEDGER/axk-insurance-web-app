import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Dot from 'components/@extended/Dot';
import { MenuOrientation, ThemeMode } from 'config';
import { iconMap } from 'utils/iconMap';

export default function NavItem({ item, level, drawerOpen = true, setDrawerOpen }) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [openItem, setOpenItem] = useState(null);

  const menuOrientation = MenuOrientation.VERTICAL;
  const pathname = usePathname();

  // useEffect(() => {
  //   console.log('Current Pathname:', pathname);
  // }, [pathname]);

  // Get the icon component from the iconMap
  const Icon = iconMap[item.icon] || iconMap['default-icon'];

  // Extract the last segment of the pathname and compare it to item.url
  const lastSegment = pathname.split('/').pop();
  // const isSelected = lastSegment === item.url;
  const isSelected = pathname === item.url;

  useEffect(() => {
    // console.log(`Checking if ${item.title} is selected: ${isSelected}`);
    if (pathname === item.url) setOpenItem(item.id);
  }, [pathname, item.url, item.title, isSelected]);

  const handleClick = () => {
    if (downLG && setDrawerOpen) {
      setDrawerOpen(false);
    }
    // console.log(`Clicked on: ${item.title}`);
  };

  const textColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[400] : theme.palette.secondary.main;
  const iconSelectedColor = theme.palette.primary.main;

  return (
    <Box sx={{ position: 'relative' }}>
      <ListItemButton
        component={Link}
        href={item.url}
        disabled={item.disabled}
        selected={isSelected}
        sx={{
          zIndex: 1201,
          pl: level === 2 ? 3.25 : drawerOpen ? (level <= 3 ? (level * 20) / 8 : (level * 20 + (level - 3) * 10) / 8) : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' },
          }),
          ...(drawerOpen &&
            level === 1 && {
            mx: 1.25,
            my: 0.5,
            borderRadius: 1,
            '&:hover': { bgcolor: theme.palette.action.hover },
            '&.Mui-selected': { color: iconSelectedColor, '&:hover': { color: iconSelectedColor } },
          }),
          ...(!drawerOpen && {
            px: 2.75,
            justifyContent: 'center',
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' },
          }),
          ...(isSelected && {
            backgroundColor: theme.palette.action.selected,
          }),
        }}
        onClick={handleClick}
      >
        {Icon && (
          <ListItemIcon
            sx={{
              minWidth: 38,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen &&
                level === 1 && {
                borderRadius: 1,
                width: 46,
                height: 46,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': { bgcolor: theme.palette.action.hover },
              }),
              ...(!drawerOpen &&
                isSelected && {
                bgcolor: theme.palette.action.selected,
                '&:hover': { bgcolor: theme.palette.action.selected },
              }),
            }}
          >
            <Icon
              size="22"
              variant="Bulk"
            />
          </ListItemIcon>
        )}

        {!Icon && drawerOpen && (
          <ListItemIcon
            sx={{
              minWidth: 30,
            }}
          >
            <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
          </ListItemIcon>
        )}

        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor, fontWeight: isSelected ? 500 : 400 }}>
                {item.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string.isRequired, // The icon key for dynamic rendering
    title: PropTypes.node.isRequired,
    url: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    chip: PropTypes.shape({
      color: PropTypes.string,
      variant: PropTypes.string,
      size: PropTypes.string,
      label: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  level: PropTypes.number.isRequired,
  drawerOpen: PropTypes.bool,
  setDrawerOpen: PropTypes.func,
};
