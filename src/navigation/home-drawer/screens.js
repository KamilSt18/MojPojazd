import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import HomeDrawer from './HomeDrawer';
import {SCREENS} from '../constants';

export function registerScreens() {
  Navigation.registerComponent(SCREENS.HOME.DASHBOARD.ID, () =>
    gestureHandlerRootHOC(HomeDrawer),
  );
}
