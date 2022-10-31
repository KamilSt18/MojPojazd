import React, {useContext} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {AuthContext} from '../../../navigation/AuthProvider';
import {appStyles} from '../../../styles/constants';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../../styles/colors';
import TextButton from '../../../components/TextButton';
import TextField from '../../../components/text-field/TextField';
import {schema} from './validationSchema';

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    justifyContent: 'space-evenly',
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
    fontWeight: '500',
    color: ADDITIONAL_COLORS.TEXT.HINT,
  },
  registerButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
});

const SingupScreen = () => {
  const {register} = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({email, password, confirmPassword}) => {
    try {
      register(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
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
          />
          <Text style={styles.agreementText}>
            Kontynuując wyrażasz zgodę na politykę prywatności i zasady i
            warunki.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingupScreen;
