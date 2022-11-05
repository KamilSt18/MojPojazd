import React from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {appStyles} from '../../../../styles/constants';
import HeaderBox from '../../../../components/HeaderBox';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';

const styles = StyleSheet.create({
  ...appStyles,
});

const DetailsTopTab = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          {/* <HeaderBox title="Szczegóły o pojezdzie" /> */}
          <Box>
            <TextBox title="VIN:" important={true} />
            <TextBox title="TMBDC63U679016591" />

            <TextBox title="Marka:" important={true} />
            <TextBox title="SKODA" />

            <TextBox title="Model:" important={true} />
            <TextBox title="3U, SUPERB" />

            <TextBox title="Wersja silnika:" important={true} />
            <TextBox title="1896 cm³, olej napędowy" />

            <TextBox title="Typ:" important={true} />
            <TextBox title="samochód osobowy, kareta (sedan)" />

            <TextBox title="Rok produkcji:" important={true} />
            <TextBox title="2007" />

            <TextBox title="Przebieg:" important={true} />
            <TextBox title="320 163 km" />

            <TextBox title="Polisa OC:" important={true} />
            <TextBox title="aktualna" />

            <TextBox title="Badanie techniczne:" important={true} />
            <TextBox title="aktualne" />

            <TextBox title="Status rejestracji:" important={true} />
            <TextBox title="Zarejestrowany" />
          </Box>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailsTopTab;
