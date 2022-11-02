import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeView from '../../views/home/Home';
import {SCREENS} from '../constants';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName={SCREENS.HOME.DASHBOARD.ID}>
      <Drawer.Screen name={SCREENS.HOME.DASHBOARD.ID} component={HomeView} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
