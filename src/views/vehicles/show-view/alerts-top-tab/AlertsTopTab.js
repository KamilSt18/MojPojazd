import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {appStyles} from '../../../../styles/constants';
import TextButton from '../../../../components/TextButton';
import {MAIN_COLORS} from '../../../../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  alertsButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
    marginTop: 25,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
});

const AlertsTopTab = () => {
  const [isEnabledVehicleInspectionDate, setIsEnabledVehicleInspectionDate] =
    useState(false);
  const [isEnabledVehicleInsuranceDate, setIsEnabledVehicleInsuranceDate] =
    useState(false);

  const [dateVehicleInspectionDate, setDateVehicleInspectionDate] =
    useState(null);

  const [dateVehicleInsuranceDate, setDateVehicleInsuranceDate] = useState();

  const onSubmit = () => {
    try {
      dateVehicleInspectionDate &&
        console.log(
          'dateVehicleInspectionDate',
          dateVehicleInspectionDate.toLocaleDateString('pl'),
        );
      dateVehicleInsuranceDate &&
        console.log(
          'dateVehicleInsuranceDate',
          dateVehicleInsuranceDate.toLocaleDateString('pl'),
        );
      // updateProfile(update, resetField);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <View>
            <View style={styles.rowItem}>
              <View style={[styles.actionContainer, {marginHorizontal: 0}]}>
                <Text style={[styles.label, {marginTop: 0}]}>
                  Data przeglądu:
                </Text>
              </View>
              <Switch
                trackColor={{false: '#767577', true: MAIN_COLORS.PRIMARY}}
                thumbColor={
                  isEnabledVehicleInspectionDate
                    ? MAIN_COLORS.ORANGE
                    : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={status => {
                  if (status) {
                    setDateVehicleInspectionDate(new Date());
                  } else {
                    setDateVehicleInspectionDate(null);
                  }
                  setIsEnabledVehicleInspectionDate(val => !val);
                }}
                value={isEnabledVehicleInspectionDate}
              />
            </View>
            {isEnabledVehicleInspectionDate && (
              <DatePicker
                style={{alignSelf: 'center'}}
                date={dateVehicleInspectionDate}
                onDateChange={date => {
                  setDateVehicleInspectionDate(date);
                }}
                androidVariant="nativeAndroid"
                mode="date"
                locale="pl"
                textColor={MAIN_COLORS.PRIMARY}
              />
            )}
          </View>

          <View>
            <View style={styles.rowItem}>
              <View style={[styles.actionContainer, {marginHorizontal: 0}]}>
                <Text style={[styles.label, {marginTop: 0}]}>
                  Data ubezpieczenia:
                </Text>
              </View>
              <Switch
                trackColor={{false: '#767577', true: MAIN_COLORS.PRIMARY}}
                thumbColor={
                  isEnabledVehicleInsuranceDate ? MAIN_COLORS.ORANGE : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={status => {
                  if (status) {
                    setDateVehicleInsuranceDate(new Date());
                  } else {
                    setDateVehicleInsuranceDate(null);
                  }
                  setIsEnabledVehicleInsuranceDate(val => !val);
                }}
                value={isEnabledVehicleInsuranceDate}
              />
            </View>
            {isEnabledVehicleInsuranceDate && (
              <DatePicker
                style={{alignSelf: 'center'}}
                date={dateVehicleInsuranceDate}
                onDateChange={date => {
                  setDateVehicleInsuranceDate(date);
                }}
                androidVariant="nativeAndroid"
                mode="date"
                locale="pl"
                textColor={MAIN_COLORS.PRIMARY}
              />
            )}
          </View>

          <View>
            <TextButton
              label={'Ustaw przypomnienia'}
              ViewProps={[styles.alertsButton]}
              onPress={() => {
                if (
                  isEnabledVehicleInspectionDate ||
                  isEnabledVehicleInsuranceDate
                ) {
                  onSubmit();
                } else {
                  console.log('Brak zaznaczonych opcji');
                }
              }}
              sign={true}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AlertsTopTab;
