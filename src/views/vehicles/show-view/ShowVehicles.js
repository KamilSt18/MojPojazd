import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS} from '../../../styles/colors';
import {SCREENS} from '../../../navigation/constants';
import HeaderBox from '../../../components/HeaderBox';

import DetailsTopTab from './details-top-tab/DetailsTopTab';
import HistoryTopTab from './history-top-tab/HistoryTopTab';
import ExpensesTopTab from './expenses-top-tab/ExpensesTopTab';
import StatisticsTopTab from './statistics-top-tab/StatisticsTopTab';

const styles = StyleSheet.create({
  ...appStyles,
  pickerStyles: {
    backgroundColor: MAIN_COLORS.ORANGE,
    color: MAIN_COLORS.SECONDARY,
  },
});

const Tab = createMaterialTopTabNavigator();

const ShowVehicles = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <SafeAreaView style={styles.root}>
      <View style={{flex: 1}}>
        <HeaderBox title="Twoje pojazdy:" />

        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          dropdownIconColor={MAIN_COLORS.SECONDARY}
          dropdownIconRippleColor={MAIN_COLORS.PRIMARY}
          prompt="Wybierz pojazd"
          style={styles.pickerStyles}>
          <Picker.Item label="Mój Merc" value="merc" />
          <Picker.Item label="Moje moto" value="moto" />
          <Picker.Item label="Służbowe" value="sluzbowe" />
        </Picker>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {fontSize: 12},
            tabBarIndicatorStyle: {backgroundColor: MAIN_COLORS.ORANGE},
          }}>
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.DETAILS.ID}
            component={DetailsTopTab}
          />
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.EXPENSES.ID}
            component={ExpensesTopTab}
          />
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.HISTORY.ID}
            component={HistoryTopTab}
          />
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.STATISTICS.ID}
            component={StatisticsTopTab}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default ShowVehicles;
