import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, Linking} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {SCREENS} from '../constants';
import MyAccount from '../../views/my-account/MyAccount';
import Vehicles from '../../views/vehicles/Vehicles';
import PrivacyPolicies from '../../views/privacy-policies/PrivacyPolicies';
import DrivingEssentials from '../../views/driving-essentials/DrivingEssentials';
import Incident from '../../views/incident/Incident';

import {MAIN_COLORS, ADDITIONAL_COLORS} from '../../styles/colors';
import logoNew from '../../assets/img/logo.svg';
// import {LangContext} from '../../lang/LangProvider';
// import {LANGUAGES} from '../../lang/constants';
import {AuthContext} from '../AuthProvider';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  hrContainer: {flexDirection: 'row', alignItems: 'center'},
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: ADDITIONAL_COLORS.GREY.DARK,
    marginVertical: 10,
  },
  contentContainer: {flexGrow: 1, justifyContent: 'center', marginVertical: 30},
  logoSection: {
    alignItems: 'center',
  },
});
function CustomDrawerContent(props) {
  // const [lang, handleChangeLanguage] = useContext(LangContext);
  const {logout} = useContext(AuthContext);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.logoSection}>
        <SvgXml width="200" height="200" xml={logoNew} />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.hrContainer}>
        <View style={styles.hr} />
      </View>

      <DrawerItem
        label="Kontakt"
        onPress={() => {
          Linking.openURL('mailto:kamilst18@gmail.com');
        }}
        icon={() => (
          <Icon size={23} name={'envelope'} color={MAIN_COLORS.PRIMARY} />
        )}
      />

      <DrawerItem
        label="Wyloguj się"
        onPress={() => {
          logout();
        }}
        icon={() => (
          <Icon size={23} name={'sign-out'} color={MAIN_COLORS.PRIMARY} />
        )}
      />
      {/* <DrawerItem
        label={`Zmień język (${lang})`}
        onPress={() => {
          handleChangeLanguage(
            lang === LANGUAGES.PL ? LANGUAGES.ENG : LANGUAGES.PL,
          );
        }}
        icon={() => (
          <Icon size={23} name={'globe'} color={MAIN_COLORS.PRIMARY} />
        )}
      /> */}
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
        headerTintColor: MAIN_COLORS.SECONDARY,
      }}>
      <Drawer.Screen
        name={SCREENS.HOME.DASHBOARD.ID}
        component={Vehicles}
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
        name={SCREENS.HOME.INCIDENT.ID}
        component={Incident}
        options={{
          drawerIcon: () => (
            <Icon
              size={30}
              name={'exclamation-triangle'}
              color={MAIN_COLORS.ORANGE}
            />
          ),
        }}
      />

      <Drawer.Screen
        name={SCREENS.HOME.DRIVING_ESSENTIALS.ID}
        component={DrivingEssentials}
        options={{
          drawerIcon: () => (
            <Icon size={30} name={'book'} color={MAIN_COLORS.ORANGE} />
          ),
        }}
      />

      <Drawer.Screen
        name="Prywatność i zasady"
        component={PrivacyPolicies}
        options={{
          drawerIcon: () => (
            <Icon size={30} name={'lock'} color={MAIN_COLORS.ORANGE} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
