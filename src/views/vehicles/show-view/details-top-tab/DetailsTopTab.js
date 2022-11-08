import React from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {appStyles} from '../../../../styles/constants';
import HeaderBox from '../../../../components/HeaderBox';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';

const styles = StyleSheet.create({
  ...appStyles,
});

const DetailsTopTab = ({data}) => {
  const textBoxes = data.map(el =>
    Object.entries(el)
      .sort((a, b) => {
        const order = [
          'Marka',
          'Model',
          'Rodzaj',
          'Typ',
          'Rok produkcji',
          'VIN',
          'Polisa OC',
          'Badanie techniczne',
          'Ostatni stan drogomierza',
          'Status rezerwacji',
          'Pojemność silnika',
          'Moc silnika',
          'Paliwo',
          'Liczba miejsc ogółem',
          'Liczba miejsc siedzących',
          'Masa własna pojazdu',
          'Maks. masa całkowita ciągniętej przyczepy z hamulcem',
          'Dopuszczalna masa całkowita',
          'Liczba osi',
          'Data wydania aktualnego dokumentu',
          'Typ dokumentu',
          'Stan dokumentu',
        ];
        order.reverse();
        return order.indexOf(a[0]) - order.indexOf(b[0]);
      })
      .reverse()
      .map(([k, v], index) => {
        if (k == 'id') {
          return null;
        }
        return (
          <React.Fragment key={index}>
            <TextBox title={k} important={true} />
            <TextBox title={v} />
          </React.Fragment>
        );
      }),
  );
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          {/* <HeaderBox title="Szczegóły o pojezdzie" /> */}
          <Box>{textBoxes}</Box>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailsTopTab;
