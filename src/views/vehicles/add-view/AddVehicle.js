import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';

import HeaderBox from '../../../components/HeaderBox';
import {appStyles} from '../../../styles/constants';
import {schema} from './validationSchema';
import TextField from '../../../components/text-field/TextField';
import TextButton from '../../../components/TextButton';
import {MAIN_COLORS} from '../../../styles/colors';
import {AuthContext} from '../../../navigation/AuthProvider';
import {ADDITIONAL_COLORS} from '../../../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  addButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
  label: {
    color: ADDITIONAL_COLORS.TEXT.BLACK,
    fontSize: 17,
    marginTop: 8,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
});

const AddVehicle = ({setUpdate, data}) => {
  const {user} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState('');
  const [date, setDate] = useState(new Date());
  const [mess, setMess] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const resetFields = () => {
    setDate(new Date());
    resetField('registrationPlate');
    resetField('vin');
  };

  const getVehicleData = async (registration_plate, vin, date_first_reg) => {
    setMess('Dodawanie pojazdu...');
    setModalVisible(true);
    await axios
      .get('https://api.deepit.pl:2053/api/vehicles', {
        params: {
          registration_plate: registration_plate,
          vin: vin,
          date_first_reg: date_first_reg,
        },
      })
      .then(function (response) {
        if (!Object.keys(response.data).length) {
          resetFields();
          throw 'Brak pojazdu w bazie!';
        }
        if (JSON.stringify(data).includes(response.data.VIN.toUpperCase())) {
          resetFields();
          throw 'Pojazd jest już dodany!';
        }
        response.data['Numer rejestracyjny'] = registration_plate.toUpperCase();
        response.data['Data pierwszej rejestracji'] = date_first_reg;
        firestore()
          .collection(`users/${user.uid}/vehicles`)
          .doc(response.data.VIN)
          .set(response.data)
          .then(() => {
            setModalVisible(false);
            resetFields();
            setMess('Dodano!');
            setModalVisible(true);

            setUpdate(val => !val);

            setTimeout(() => {
              setModalVisible(false);
            }, 1500);
          });
      })
      .catch(function (err) {
        console.log(err);

        setErr(err);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          setErr('');
        }, 1500);
      });
  };

  const onSubmit = ({dateFirstReg, registrationPlate, vin}) => {
    try {
      if (!dateFirstReg) {
        dateFirstReg = new Date();
      }

      getVehicleData(
        registrationPlate,
        vin,
        dateFirstReg.toLocaleDateString('pl'),
      );
    } catch (e) {
      console.log(e);

      setModalVisible(true);
      setErr(e);
      setTimeout(() => {
        setModalVisible(false);
        setErr('');
      }, 1500);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <HeaderBox title="Dodawanie pojazdu" />
        <View>
          <Controller
            name={'registrationPlate'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label="Numer rejestracyjny"
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.registrationPlate}
              />
            )}
          />

          <Controller
            name={'vin'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label="Numer VIN"
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.vin}
              />
            )}
          />
          <View style={styles.actionContainer}>
            <Text style={styles.label}>Data pierwszej rejestracji</Text>
          </View>
          <Controller
            name={'dateFirstReg'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <DatePicker
                style={{alignSelf: 'center'}}
                date={date}
                onDateChange={date => {
                  setDate(date);
                  onChange(date);
                }}
                androidVariant="nativeAndroid"
                mode="date"
                locale="pl"
                textColor={MAIN_COLORS.PRIMARY}
              />
            )}
          />
        </View>
        <View>
          <TextButton
            label={'Dodaj pojazd'}
            ViewProps={[styles.addButton]}
            TouchableOpacityProps={{
              onPress: handleSubmit(onSubmit),
            }}
            sign={true}
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
    </SafeAreaView>
  );
};

export default AddVehicle;
