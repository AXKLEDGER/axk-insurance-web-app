import PropTypes from 'prop-types';
import { useEffect, useState, Fragment } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import SimpleBar from 'components/third-party/SimpleBar';
import Transitions from 'components/@extended/Transitions';

import { MenuOrientation, ThemeMode } from 'config';

// assets
import { More2 } from 'iconsax-react';
import useConfig from 'hooks/useConfig';

const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    background: theme.palette.background.paper,
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 5,
    left: 32,
    width: 12,
    height: 12,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: `${theme.palette.background.paper}  transparent transparent ${theme.palette.background.paper}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`
  }
}));

export default function NavGroup({
  item,
  lastItem,
  remItems = [],
  selectedID,
  setSelectedID,
  lastItemId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
  drawerOpen
}) {
  const theme = useTheme();
  const pathname = usePathname();

  const { menuOrientation, menuCaption } = useConfig();

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele) => ele.elements);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
  }, [item, lastItem, downLG]);

  const checkOpenForParent = (child, id) => {
    child.forEach((ele) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id);
      }

      if (ele.url && pathname.includes(ele.url)) {
        setSelectedID(id);
      }
    });
  };

  const checkSelectedOnload = (data) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }

      if (itemCheck.url && pathname.includes(itemCheck.url)) {
        setSelectedID(currentItem.id);
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
  }, [pathname, currentItem]);

  const handleClick = (event) => {
    if (!openMini) {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSelected = selectedID === currentItem.id;

  const Icon = currentItem?.icon;
  const itemIcon = currentItem?.icon ? (
    <Icon variant="Bulk" size={22} color={isSelected ? theme.palette.primary.main : theme.palette.secondary.main} />
  ) : null;

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id}
            drawerOpen={drawerOpen}
          />
        );
      case 'item':
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={1}
            drawerOpen={drawerOpen}
          />
        );
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  const moreItems = remItems.map((itemRem, i) => (
    <Fragment key={i}>
      {itemRem.url ? (
        <NavItem
          item={itemRem}
          level={1}
          drawerOpen={drawerOpen}
        />
      ) : (
        itemRem.title && (
          <Typography variant="caption" sx={{ pl: 2 }}>
            {itemRem.title} {itemRem.url}
          </Typography>
        )
      )}

      {itemRem?.elements?.map((menu) => {
        switch (menu?.type) {
          case 'collapse':
            return (
              <NavCollapse
                key={menu.id}
                menu={menu}
                level={1}
                parentId={currentItem.id}
                setSelectedItems={setSelectedItems}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
                selectedItems={selectedItems}
                drawerOpen={drawerOpen}
              />
            );
          case 'item':
            return (
              <NavItem
                key={menu.id}
                item={menu}
                level={1}
                drawerOpen={drawerOpen}
              />
            );
          default:
            return (
              <Typography key={menu?.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      })}
    </Fragment>
  ));

  const items = currentItem.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menu.id}
            menu={menu}
            level={1}
            parentId={currentItem.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            drawerOpen={drawerOpen}
          />
        );
      case 'item':
        return (
          <NavItem
            key={menu.id}
            item={menu}
            level={1}
            drawerOpen={drawerOpen}
          />
        );
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const popperId = openMini ? `group-pop-${item.id}` : undefined;
  const textColor = theme.palette.mode === ThemeMode.DARK ? 'secondary.400' : 'secondary.main';

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <List
          subheader={
            <>
              {item.title ? (
                drawerOpen &&
                menuCaption && (
                  <Box sx={{ pl: 3, mb: 1.5 }}>
                    <Typography
                      variant="h5"
                      color={theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'secondary.dark'}
                      sx={{ textTransform: 'uppercase', fontSize: '0.688rem' }}
                    >
                      {item.title}
                    </Typography>
                    {item.caption && (
                      <Typography variant="caption" color="secondary">
                        {item.caption}
                      </Typography>
                    )}
                  </Box>
                )
              ) : (
                <Divider sx={{ my: 0.5 }} />
              )}
            </>
          }
          sx={{ mt: drawerOpen && menuCaption && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
          {navCollapse}
        </List>
      ) : (
        <List>
          <ListItemButton
            selected={isSelected}
            sx={{ p: 1, px: 1.5, my: 0.5, mr: 1, display: 'flex', alignItems: 'center', borderRadius: 1 }}
            onMouseEnter={handleClick}
            onClick={handleClick}
            onMouseLeave={handleClose}
            disableTouchRipple
            aria-describedby={popperId}
          >
            {itemIcon && (
              <ListItemIcon sx={{ minWidth: 32 }}>
                {currentItem.id === lastItemId ? <More2 size={22} variant="Bulk" /> : itemIcon}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{ mr: 1 }}
              primary={
                <Typography variant="h6" color={isSelected ? 'primary' : textColor} sx={{ fontWeight: isSelected ? 500 : 400 }}>
                  {currentItem.id === lastItemId ? <FormattedMessage id="more-items" /> : currentItem.title}
                </Typography>
              }
            />
            {anchorEl && (
              <PopperStyled id={popperId} open={openMini} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 2001 }}>
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        mt: 0.5,
                        py: 1.25,
                        boxShadow: theme.customShadows.z1,
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundImage: 'none'
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <SimpleBar sx={{ minWidth: 200, overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
                          {currentItem.id !== lastItemId ? items : moreItems}
                        </SimpleBar>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
        </List>
      )}
    </>
  );
}

NavGroup.propTypes = {
  item: PropTypes.any,
  lastItem: PropTypes.number,
  remItems: PropTypes.array,
  selectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  setSelectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  lastItemId: PropTypes.string,
  setSelectedItems: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  selectedItems: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  setSelectedLevel: PropTypes.func,
  selectedLevel: PropTypes.number,
  drawerOpen: PropTypes.bool.isRequired,
};
