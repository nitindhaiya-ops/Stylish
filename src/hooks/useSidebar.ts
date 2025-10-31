import { useDrawerStatus } from 'react-native-drawer-layout';
// Module '"react-native-drawer-layout"' has no exported member 'useDrawerStatus'.ts(2305)

import { DrawerActions, useNavigation } from '@react-navigation/native';

export const useSidebar = () => {
  const navigation = useNavigation<any>();
  const isOpen = useDrawerStatus() === 'open';

  const open = () => navigation.dispatch(DrawerActions.openDrawer());
  const close = () => navigation.dispatch(DrawerActions.closeDrawer());
  const toggle = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return { isOpen, open, close, toggle };
};