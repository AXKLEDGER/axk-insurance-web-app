import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import NavItem from './NavItem';
import Dot from 'components/@extended/Dot';
import SimpleBar from 'components/third-party/SimpleBar';
import Transitions from 'components/@extended/Transitions';

import useConfig from 'hooks/useConfig';
import { MenuOrientation, ThemeMode } from 'config';

// assets
import { ArrowDown2, ArrowUp2, ArrowRight2, Copy } from 'iconsax-react';

// mini-menu - wrapper
const PopperStyled = styled('div')(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  position: 'absolute',
  top: 0,
  left: 0,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

export default function NavCollapse({ menu, level, parentId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel, setDrawerOpen, drawerOpen }) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, isRedirect) => {
    setAnchorEl(event?.currentTarget);
    setSelectedLevel(level);
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
    setSelectedItems(!selected ? menu.id : '');
    if (menu.url && isRedirect) {
      router.push(`${menu.url}`);
      if (downLG) setDrawerOpen(false); // Close drawer on small screens
    }
  };

  const handlerIconLink = () => {
    if (menu.url) {
      router.push(`${menu.url}`);
      if (menuOrientation === MenuOrientation.VERTICAL) setSelected(menu.id);
      if (downLG) setDrawerOpen(false); // Close drawer on small screens
    }
  };

  const handleHover = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const miniMenuOpened = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useMemo(() => {
    if (selected === selectedItems && level === 1) {
      setOpen(true);
    } else if (level === selectedLevel) {
      setOpen(false);
      if (!miniMenuOpened && !selected) {
        setSelected(null);
      }
    }
  }, [selectedItems, level, selected, miniMenuOpened, selectedLevel]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === menu.url) {
      setSelected(menu.id);
    }
  }, [pathname, menu.url]);

  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  useEffect(() => {
    if (!miniMenuOpened) {
      setSelected(null);
    }
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.children]);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
            drawerOpen={drawerOpen}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} setDrawerOpen={setDrawerOpen} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;
  const borderIcon = level === 1 ? <Copy variant="Bulk" size={22} /> : false;
  const Icon = menu.icon;
  const menuIcon = menu.icon ? <Icon variant="Bulk" size={22} /> : borderIcon;
  const textColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[400] : theme.palette.secondary.main;
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.text.primary : theme.palette.primary.main;
  const popperId = miniMenuOpened ? `collapse-pop-${menu.id}` : undefined;
  const FlexBox = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' };

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <>
          <ListItemButton
            id={`${menu.id}-button`}
            selected={isSelected}
            onMouseEnter={handleHover}
            onClick={(e) => handleClick(e, true)}
            sx={{
              pl: level === 2 ? 3.25 : 1.5,
              py: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                color: iconSelectedColor,
              },
            }}
          >
            {menuIcon && (
              <ListItemIcon
                onClick={handlerIconLink}
                sx={{
                  minWidth: 38,
                  color: isSelected ? 'primary.main' : textColor,
                }}
              >
                {menuIcon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  color={isSelected ? 'primary' : textColor}
                  sx={{ fontWeight: isSelected ? 500 : 400 }}
                >
                  {menu.title}
                </Typography>
              }
            />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List>{navCollapse}</List>
          </Collapse>
        </>
      ) : (
        <PopperStyled id={popperId} open={miniMenuOpened} anchorEl={anchorEl} placement="right-start">
          <Transitions in={miniMenuOpened}>
            <Box
              sx={{
                mt: 1.5,
                py: 0.5,
                boxShadow: theme.customShadows.z1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <SimpleBar>{navCollapse}</SimpleBar>
            </Box>
          </Transitions>
        </PopperStyled>
      )}
    </>
  );
}

NavCollapse.propTypes = {
  menu: PropTypes.any,
  level: PropTypes.number,
  parentId: PropTypes.string,
  setSelectedItems: PropTypes.func,
  selectedItems: PropTypes.string,
  setSelectedLevel: PropTypes.func,
  selectedLevel: PropTypes.number,
  setDrawerOpen: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};
