import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../../../navigation/AuthProvider';
import {appStyles} from '../../../styles/constants';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../../styles/colors';
import TextButton from '../../../components/TextButton';
import TextField from '../../../components/text-field/TextField';
import {schema} from './validationSchema';

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  joinUs: {
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
    fontWeight: '500',
  },
  agreementText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    fontWeight: '500',
    color: ADDITIONAL_COLORS.TEXT.HINT,
  },
  registerButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
  angle: {
    padding: 20,
  },
  link: {
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontWeight: '500',
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

const SingupScreen = ({navigation}) => {
  const {register, modalVisible, setModalVisible, err} =
    useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({email, password}) => {
    try {
      register(email, password);
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
        <Text style={styles.joinUs}>Dołącz do nas już dziś!</Text>
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
          <Controller
            name={'confirmPassword'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label="Powtórz hasło"
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.confirmPassword}
                secureTextEntry={true}
                textContentType="password"
              />
            )}
          />
        </View>
        <View>
          <TextButton
            label={'Stwórz konto'}
            ViewProps={[styles.registerButton]}
            TouchableOpacityProps={{
              onPress: handleSubmit(onSubmit),
            }}
            sign={true}
          />
          <Text style={styles.agreementText}>
            Kontynuując wyrażasz zgodę na
            <Text style={styles.link}> politykę prywatności </Text>i{' '}
            <Text style={styles.link}>zasady i warunki</Text>.
          </Text>
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
                {err && 'Nie można utworzyć konta...'}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SingupScreen;
