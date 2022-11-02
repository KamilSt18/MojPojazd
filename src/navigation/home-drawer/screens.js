import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import HomeDrawer from './HomeDrawer';
import MyAccount from '../../views/my-account/MyAccount';
import Settings from '../../views/settings/Settings';
import Vehicles from '../../views/vehicles/Vehicles';
import {SCREENS} from '../constants';

export function registerScreens() {
  Navigation.registerComponent(SCREENS.HOME.DASHBOARD.ID, () =>
    gestureHandlerRootHOC(HomeDrawer),
  );
  Navigation.registerComponent(SCREENS.HOME.MY_ACCOUNT.ID, () =>
    gestureHandlerRootHOC(MyAccount),
  );
  Navigation.registerComponent(SCREENS.HOME.SETTINGS.ID, () =>
    gestureHandlerRootHOC(Settings),
  );
  Navigation.registerComponent(SCREENS.HOME.VEHICLES.ID, () =>
    gestureHandlerRootHOC(Vehicles),
  );
}
