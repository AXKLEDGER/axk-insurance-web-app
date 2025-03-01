// Import all menus from menus.jsx
import { adminMenu, userMenu, traderMenu, farmerMenu, cooperativeMenu } from 'menu-items/menus';
import { useMemo, useState } from 'react';

// Initial state for menu master
const initialState = {
  openedItem: 'dashboard', // Currently active sidebar item
  openedComponent: 'buttons', // Currently active component
  openedHorizontalItem: null, // Currently active horizontal menu item
  isDashboardDrawerOpened: false, // Controls dashboard drawer open/close state
  isComponentDrawerOpened: true // Controls component drawer open/close state
};

// Local endpoints placeholder (no API calls)
export const endpoints = {
  key: 'local/menu',
  master: 'master',
  dashboard: '/dashboard'
};

/**
 * Function to get the appropriate menu based on the user's role.
 * @param {string} role - The role of the user (e.g., 'admin', 'user', 'trader', 'farmer', 'cooperative', 'guest').
 * @returns {Array} The menu corresponding to the role.
 */
function getMenuByRole(role) {
  switch (role) {
    case 'admin':
      return adminMenu;
    case 'user':
      return userMenu;
    case 'trader':
      return traderMenu;
    case 'farmer':
      return farmerMenu;
    case 'cooperative':
      return cooperativeMenu;
    default:
      return null;
  }
}

/**
 * Hook to get menus based on the user's role.
 * @param {string} role - The role of the user (e.g., 'admin', 'user', 'trader', 'farmer', 'cooperative', 'guest').
 * @returns {object} Contains the selected menu and loading/error states.
 */
export function useGetMenu(role) {
  const menu = getMenuByRole(role);

  const memoizedValue = useMemo(
    () => ({
      menu,
      menuLoading: false, // No loading state as menus are static
      menuError: null, // No error state as menus are static
      menuValidating: false, // No validation as menus are static
      menuEmpty: !menu?.length // Checks if the menu is empty
    }),
    [menu]
  );

  return memoizedValue;
}

/**
 * Hook to manage and update the menu master state locally.
 * @returns {object} Contains the current state, loading status, and an updater function.
 */
export function useGetMenuMaster() {
  const [menuMaster, setMenuMaster] = useState(initialState);

  const updateMenuMaster = (updates) => {
    setMenuMaster((currentState) => ({
      ...currentState,
      ...updates
    }));
  };

  const memoizedValue = useMemo(
    () => ({
      menuMaster,
      menuMasterLoading: false // No loading state as everything is local
    }),
    [menuMaster]
  );

  return { ...memoizedValue, updateMenuMaster };
}

/**
 * Updates the drawer's open/close state.
 * @param {boolean} isComponentDrawerOpened - Whether the component drawer is open.
 * @param {function} updateMenuMaster - Function to update the menu master state.
 */
export function handlerComponentDrawer(isComponentDrawerOpened, updateMenuMaster) {
  updateMenuMaster({ isComponentDrawerOpened });
}

/**
 * Sets the currently active component in the menu.
 * @param {string} openedComponent - The component to set as active.
 * @param {function} updateMenuMaster - Function to update the menu master state.
 */
export function handlerActiveComponent(openedComponent, updateMenuMaster) {
  updateMenuMaster({ openedComponent });
}

/**
 * Toggles the dashboard drawer's open/close state.
 * @param {boolean} isDashboardDrawerOpened - Whether the dashboard drawer is open.
 * @param {function} updateMenuMaster - Function to update the menu master state.
 */
export function handlerDrawerOpen(isDashboardDrawerOpened, updateMenuMaster) {
  updateMenuMaster({ isDashboardDrawerOpened });
}

/**
 * Sets the currently active horizontal menu item.
 * @param {string} openedHorizontalItem - The horizontal menu item to set as active.
 * @param {function} updateMenuMaster - Function to update the menu master state.
 */
export function handlerHorizontalActiveItem(openedHorizontalItem, updateMenuMaster) {
  updateMenuMaster({ openedHorizontalItem });
}

/**
 * Sets the currently active sidebar menu item.
 * @param {string} openedItem - The sidebar item to set as active.
 * @param {function} updateMenuMaster - Function to update the menu master state.
 */
export function handlerActiveItem(openedItem, updateMenuMaster) {
  updateMenuMaster({ openedItem });
}
