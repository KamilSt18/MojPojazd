import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS} from '../../../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  pickerStyles: {
    backgroundColor: MAIN_COLORS.PRIMARY,
    color: MAIN_COLORS.SECONDARY,
  },
});

const ShowVehicles = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={styles.section}>
          <Text
            style={[
              styles.formatText,
              {textAlign: 'center'},
              styles.shadowText,
            ]}>
            Twoje pojazdy:
          </Text>
        </View>

        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          dropdownIconColor={MAIN_COLORS.SECONDARY}
          dropdownIconRippleColor={MAIN_COLORS.ORANGE}
          prompt="Wybierz pojazd"
          style={styles.pickerStyles}>
          <Picker.Item label="Mój Merc" value="merc" />
          <Picker.Item label="Moje moto" value="moto" />
          <Picker.Item label="Służbowe" value="sluzbowe" />
        </Picker>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowVehicles;
