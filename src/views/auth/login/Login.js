import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../../../navigation/AuthProvider';
import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS, ADDITIONAL_COLORS} from '../../../styles/colors';
import {schema} from './validationSchema';
import TextField from '../../../components/text-field/TextField';
import TextButton from '../../../components/TextButton';
import {SCREENS} from '../../../navigation/constants';

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  login: {
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
    fontWeight: '500',
  },
  angle: {
    padding: 20,
  },
  loginButton: {
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
  resetPassword: {
    textAlign: 'right',
    marginHorizontal: 20,
    marginVertical: 5,
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontWeight: '500',
  },
});

const LoginScreen = ({navigation}) => {
  const {login, modalVisible, setModalVisible, err} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({email, password}) => {
    try {
      login(email, password, resetField);
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
        <Text style={styles.login}>Zaloguj się</Text>

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
          <Controller
            name={'password'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label="Hasło"
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.password}
                secureTextEntry={true}
                textContentType="password"
              />
            )}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.AUTH.RESET_PASSWORD.ID);
            }}
            activeOpacity={0.5}>
            <Text style={styles.resetPassword}>Nie pamiętasz hasła?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextButton
            label={'Zaloguj się'}
            ViewProps={[styles.loginButton]}
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
                {err && 'Błędny adres e-mail lub hasło!'}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
