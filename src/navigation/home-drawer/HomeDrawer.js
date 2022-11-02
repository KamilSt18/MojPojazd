import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet} from 'react-native';

import {SCREENS} from '../constants';
import HomeView from '../../views/home/Home';
import MyAccount from '../../views/my-account/MyAccount';
import Settings from '../../views/settings/Settings';
import Vehicles from '../../views/vehicles/Vehicles';
import {MAIN_COLORS, ADDITIONAL_COLORS} from '../../styles/colors';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  hrContainer: {flexDirection: 'row', alignItems: 'center'},
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: ADDITIONAL_COLORS.GREY.DARK,
    marginVertical: 10,
  },
});
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.hrContainer}>
        <View style={styles.hr} />
      </View>
      <DrawerItem
        label="Kontakt"
        onPress={() => alert('Kontakt')}
        icon={({focused}) => (
          <Icon size={23} name={'envelope'} color={MAIN_COLORS.PRIMARY} />
        )}
      />
      <DrawerItem
        label="Polityka prywatności"
        onPress={() => alert('Polityka prywatności')}
        icon={({focused}) => (
          <Icon size={30} name={'lock'} color={MAIN_COLORS.PRIMARY} />
        )}
      />
      <DrawerItem
        label="Zasady i warunki"
        onPress={() => alert('Zasady i warunki')}
        icon={({focused}) => (
          <Icon size={23} name={'sticky-note'} color={MAIN_COLORS.PRIMARY} />
        )}
      />
      <DrawerItem
        label="Zmień język"
        onPress={() => alert('Zmień język')}
        icon={({focused}) => (
          <Icon size={23} name={'globe'} color={MAIN_COLORS.PRIMARY} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.HOME.DASHBOARD.ID}
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: MAIN_COLORS.SECONDARY,
          width: 300,
        },
        drawerActiveTintColor: MAIN_COLORS.ORANGE,
        headerStyle: {
          backgroundColor: MAIN_COLORS.ORANGE,
          height: 70,
        },
        drawerLabelStyle: {textAlign: 'center', fontSize: 16},
        headerTitleStyle: {
          color: MAIN_COLORS.SECONDARY,
          fontSize: 22,
        },
        headerTitleAlign: 'center',
        headerTintColor: MAIN_COLORS.SECONDARY,
      }}>
      <Drawer.Screen
        name={SCREENS.HOME.DASHBOARD.ID}
        component={HomeView}
        options={{
          drawerIcon: () => (
            <Icon size={30} name={'home'} color={MAIN_COLORS.ORANGE} />
          ),
        }}
      />

      <Drawer.Screen
        name={SCREENS.HOME.MY_ACCOUNT.ID}
        component={MyAccount}
        options={{
          drawerIcon: () => (
            <Icon size={30} name={'user'} color={MAIN_COLORS.ORANGE} />
          ),
        }}
      />

      <Drawer.Screen
        name={SCREENS.HOME.VEHICLES.ID}
        component={Vehicles}
        options={{
          drawerIcon: () => (
            <Icon size={25} name={'car'} color={MAIN_COLORS.ORANGE} />
          ),
        }}
      />

      <Drawer.Screen
        name={SCREENS.HOME.SETTINGS.ID}
        component={Settings}
        options={{
          drawerIcon: () => (
            <Icon size={30} name={'gear'} color={MAIN_COLORS.ORANGE} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
