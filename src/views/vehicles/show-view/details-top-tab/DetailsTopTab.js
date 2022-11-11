import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

import {appStyles} from '../../../../styles/constants';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';
import TextButton from '../../../../components/TextButton';
import {MAIN_COLORS, ADDITIONAL_COLORS} from '../../../../styles/colors';
import {
  firestoreDelete,
  getVehicleData,
  firestoreSet,
} from '../../../../API/API';

const styles = StyleSheet.create({
  ...appStyles,
  refreshButton: {
    backgroundColor: MAIN_COLORS.ORANGE,
    width: 180,
    margin: 10,
    paddingVertical: 12,
    marginVertical: 12,
  },
  removeButton: {
    backgroundColor: MAIN_COLORS.RED,
    width: 180,
    margin: 10,
    paddingVertical: 12,
    marginVertical: 12,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

const DetailsTopTab = ({data, selectedVehicle, user, setUpdate}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState('');
  const [mess, setMess] = useState('');
  const textBoxes = data.map(el =>
    Object.entries(el)
      .sort((a, b) => {
        const order = [
          'Numer rejestracyjny',
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
          <Box marginVertical={0}>{textBoxes}</Box>
          <View style={styles.buttonsView}>
            <TextButton
              label={'Odśwież'}
              ViewProps={[styles.refreshButton]}
              onPress={() => {
                setMess('Aktualizowanie danych...');
                setModalVisible(true);
                getVehicleData(
                  data[0]['Numer rejestracyjny'],
                  selectedVehicle,
                  data[0]['Data pierwszej rejestracji'],
                ).then(res => {
                  firestoreSet(
                    `users/${user.uid}/vehicles`,
                    selectedVehicle,
                    res,
                  )
                    .then(mess => {
                      setModalVisible(false);
                      setMess(mess);
                      setModalVisible(true);
                      setUpdate(val => !val);

                      setTimeout(() => {
                        setModalVisible(false);
                      }, 1500);
                    })
                    .catch(err => {
                      console.log(err);
                      setErr(err);
                      setModalVisible(true);
                      setTimeout(() => {
                        setModalVisible(false);
                        setErr('');
                      }, 1500);
                    });
                });
              }}
            />
            <TextButton
              label={'Usun'}
              ViewProps={[styles.removeButton]}
              TouchableOpacityProps={{
                onPress: () => {
                  Alert.alert(
                    'Usuwanie pojazdu',
                    'Czy na pewno chcesz usunąć pojazd?',
                    [
                      {
                        text: 'Nie',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'Tak',
                        onPress: () => {
                          firestoreDelete(
                            `users/${user.uid}/vehicles`,
                            selectedVehicle,
                          );
                          setMess('Usunięto!');
                          setModalVisible(true);

                          setTimeout(() => {
                            setModalVisible(false);
                            setUpdate(val => !val);
                          }, 1500);
                        },
                      },
                    ],
                  );
                },
              }}
            />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={[
                    styles.modalText,
                    !err ? {color: ADDITIONAL_COLORS.TEXT.GREEN} : null,
                  ]}>
                  {err ? `Wystąpił błąd! (${err})` : mess}
                </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailsTopTab;
