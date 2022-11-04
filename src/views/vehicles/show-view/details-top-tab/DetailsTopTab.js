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
            <TextBox title="Marka:" important={true} />
            <TextBox title="Mercedes-Benz" />

            <TextBox title="Model:" important={true} />
            <TextBox title="Klasa S (W140)" />

            <TextBox title="VIN:" important={true} />
            <TextBox title="VF73A9HC8DJ819035" />

            <TextBox title="Rok produkcji:" important={true} />
            <TextBox title="2001" />

            <TextBox title="Przebieg:" important={true} />
            <TextBox title="120 256 km" />

            <TextBox title="Wersja silnika:" important={true} />
            <TextBox title="2 143 cm3 Diesel" />

            <TextBox title="Kolor:" important={true} />
            <TextBox title="Brązowy" />

          </Box>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailsTopTab;
