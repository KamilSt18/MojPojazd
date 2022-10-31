import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
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
    borderRadius: 20,
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
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 150,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const LoginScreen = ({navigation}) => {
  const {login, modalVisible, setModalVisible, err} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({email, password}) => {
    try {
      login(email, password);
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {err && 'Błędny użytkownik lub hasło!'}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
