import React, {useContext} from 'react';
import {SafeAreaView, Text, Modal, StyleSheet, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {AuthContext} from '../../navigation/AuthProvider';
import {appStyles} from '../../styles/constants';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../styles/colors';
import {schema} from './validationSchema';
import TextField from '../../components/text-field/TextField';
import TextButton from '../../components/TextButton';

const styles = StyleSheet.create({
  ...appStyles,
  updateButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
});

export default function MyAccount({navigation}) {
  const {user, updateProfile, modalVisible, setModalVisible, err} =
    useContext(AuthContext);
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
      updateProfile(update, resetField);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Controller
          name={'displayName'}
          control={control}
          defaultValue={user.displayName}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              label="Nazwa użytkownika"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              error={errors.displayName}
            />
          )}
        />
      </View>
      <View>
        <TextButton
          label={'Zaaktualizuj dane'}
          ViewProps={[styles.updateButton]}
          TouchableOpacityProps={{
            onPress: handleSubmit(onSubmit),
          }}
          sign={true}
        />

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
                {err
                  ? `Wystąpił błąd! (${err})`
                  : 'Pomyślnie zaaktualizowano dane!'}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

{
  /* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */
}
