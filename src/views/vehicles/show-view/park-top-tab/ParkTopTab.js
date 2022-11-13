import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {appStyles} from '../../../../styles/constants';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';

const styles = StyleSheet.create({
  ...appStyles,
});

const ParkTopTab = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <Box marginVertical={0}>
            <TextBox title="Sekcja pozwala na zapisanie">
              <TextBox title=" lokalizacji pojazdu " important={true} />
              <TextBox title="pobieranej z aktualnej pozycji telefonu za pomocą" />
              <TextBox title=" modułu GPS " important={true} />
              <TextBox title="i umożliwia nawigowanie do pojazdu." />
            </TextBox>
          </Box>
          <View>
            <Text style={[styles.label, {alignSelf: 'center', marginTop: 20}]}>
              Brak zapisanej lokalizacji
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ParkTopTab;
