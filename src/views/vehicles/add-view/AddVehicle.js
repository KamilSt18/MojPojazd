import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
// import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePicker from 'react-native-date-picker';

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

const AddVehicle = () => {
  const {user, modalVisible, setModalVisible, err, addVehicle} =
    useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const {
    control,
    handleSubmit,
    formState: {errors},
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = props => {
    try {
      addVehicle(props);

      setDate(new Date());
      resetField('registrationPlate');
      resetField('vin');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
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
      </ScrollView>
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
              {err ? `Wystąpił błąd! (${err})` : 'Pomyślnie dodano!'}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddVehicle;
