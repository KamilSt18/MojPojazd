import React, {useContext} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Modal} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS, ADDITIONAL_COLORS} from '../../../styles/colors';
import {AuthContext} from '../../../navigation/AuthProvider';
import {schema} from './validationSchema';
import TextField from '../../../components/text-field/TextField';
import TextButton from '../../../components/TextButton';

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  reset: {
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
    fontWeight: '500',
  },
  angle: {
    padding: 20,
  },
  resetButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: MAIN_COLORS.SECONDARY,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    color: 'red',
  },
});

const ResetPassword = ({navigation}) => {
  const {resetPassword, modalVisible, setModalVisible, err} =
    useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({email}) => {
    resetField('email');
    try {
      resetPassword(email);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.5}>
          <Icon
            name="angle-left"
            size={40}
            color={MAIN_COLORS.PRIMARY}
            style={styles.angle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.reset}>Resetowanie hasła</Text>

        <View>
          <Controller
            name={'email'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label="Adres e-mail"
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.email}
                textContentType="emailAddress"
              />
            )}
          />
        </View>
        <View>
          <TextButton
            label={'Resetuj hasło'}
            ViewProps={[styles.resetButton]}
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
              <Text style={styles.modalText}>
                Sprawdź swoją skrzynkę mailową.
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
