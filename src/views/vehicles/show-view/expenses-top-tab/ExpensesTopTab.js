import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text, TextBase} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';

import {appStyles} from '../../../../styles/constants';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';
import {schema} from './validationSchema';
import TextField from '../../../../components/text-field/TextField';
import TextButton from '../../../../components/TextButton';
import {MAIN_COLORS} from '../../../../styles/colors';
import Card from '../../../../components/Card';
import Wallet from '../../../../assets/img/wallet.png';

const styles = StyleSheet.create({
  ...appStyles,
  addExpensesButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
    width: 180,
  },
  cancelExpensesButton: {
    backgroundColor: MAIN_COLORS.ORANGE,
    width: 180,
  },
});

const ExpensesTopTab = ({
  displayAddExpenses,
  setDisplayAddExpenses,
  user,
  selectedVehicle,
  updateExpensesTopTab,
  setUpdateExpensesTopTab,
  setExpensesData,
  setModalVisible,
  setMess,
}) => {
  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState();
  const [sum, setSum] = useState(0.0);
  useEffect(() => {
    setCards([]);
    firestore()
      .collection(`users/${user.uid}/expenses`)
      .doc(selectedVehicle)
      .collection('expense')
      .orderBy('date')
      .get()
      .then(collectionSnapshot => {
        setCounter(collectionSnapshot.size);
        let sum = 0;
        collectionSnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data();
          sum += data.cost;
          // data.forEach(el => console.log(el));
          setExpensesData(arr => [...arr, data]);
          setCards(arr => [
            ...arr,
            <Card
              key={data.date.seconds + Math.random()}
              img={Wallet}
              name={data.name}
              cost={data.cost}
              date={new Date(data.date.seconds * 1000).toLocaleString('pl')}
            />,
          ]);
        });
        setSum(Math.round(sum * 100) / 100);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedVehicle, updateExpensesTopTab]);

  const resetFields = () => {
    resetField('name');
    resetField('cost');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = update => {
    try {
      update.date = new Date();
      firestore()
        .collection(`users/${user.uid}/expenses`)
        .doc(selectedVehicle)
        .collection('expense')
        .doc()
        .set(update)
        .then(() => {
          // console.log('Ustawiono dane!');
          setMess('Zaaktualizowano!');
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            setUpdateExpensesTopTab(val => !val);
          }, 1500);
        })
        .catch(err => {
          console.log(err);
        });
      resetFields();
      setDisplayAddExpenses(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box marginVertical={0}>
            <TextBox title="Kontroluj">
              <TextBox title=" wydatki " important={true} />
              <TextBox title="i" />
              <TextBox title=" archiwizuj koszty " important={true} />
              <TextBox title="powiązane z konkretnym pojazdem, aby lepiej zarządzać" />
              <TextBox title=" przeznaczonym kapitałem" important={true} />
              <TextBox title="." />
            </TextBox>
          </Box>
          <View>
            {displayAddExpenses && (
              <>
                <View>
                  <Controller
                    name={'name'}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextField
                        label="Nazwa"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        error={errors.name}
                      />
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name={'cost'}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextField
                        label="Koszt [zł]"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        error={errors.cost}
                        keyboardType="numeric"
                      />
                    )}
                  />
                </View>
                <View>
                  <View style={styles.buttonsView}>
                    <TextButton
                      label={'Anuluj'}
                      ViewProps={[styles.cancelExpensesButton]}
                      onPress={() => {
                        setDisplayAddExpenses(false);
                        resetFields();
                      }}
                    />
                    <TextButton
                      label={'Dodaj wydatek'}
                      ViewProps={[styles.addExpensesButton]}
                      TouchableOpacityProps={{
                        onPress: handleSubmit(onSubmit),
                      }}
                    />
                  </View>
                </View>
              </>
            )}
            {counter > 0 ? (
              <View>
                <Box marginTop={10}>
                  <TextBox title="Liczba wydatków: ">
                    <TextBox title={counter} important={true} />
                  </TextBox>
                  <TextBox title="Suma: ">
                    <TextBox title={`${sum} zł`} important={true} />
                  </TextBox>
                </Box>
                {cards.reverse()}
              </View>
            ) : (
              <Box marginTop={10}>
                <TextBox style={{textAlign: 'center'}} title="Brak wydatków!" />
              </Box>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExpensesTopTab;
