import React, {useState} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  textInput: {
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: MAIN_COLORS.ORANGE,
    fontSize: 20,
    color: ADDITIONAL_COLORS.TEXT.BLACK,
  },
  focus: {
    borderColor: MAIN_COLORS.PRIMARY,
  },
  label: {
    color: ADDITIONAL_COLORS.TEXT.BLACK,
    fontSize: 17,
    marginVertical: 8,
    fontWeight: '500',
  },
  action: {
    color: '#000',
    fontSize: 17,
    marginVertical: 8,
    fontWeight: 'BOLD',
  },
  error: {
    borderColor: 'red',
  },
  errorLabel: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: 25,
    fontWeight: 'BOLD',
    marginVertical: 3,
  },
});

const TextField = ({
  style,
  placeholder,
  error,
  label,
  actionLabel = '',
  action = () => null,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.container}>
      {(actionLabel || label) && (
        <View style={styles.actionContainer}>
          <Text style={styles.label}>{label}</Text>
          {actionLabel && <Text style={styles.action}>{actionLabel}</Text>}
        </View>
      )}
      <TextInput
        {...rest}
        autoCapitalize={'none'}
        placeholderTextColor={ADDITIONAL_COLORS.TEXT.HINT}
        selectionColor={MAIN_COLORS.PRIMARY}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={[
          styles.textInput,
          focus ? styles.focus : null,
          error ? styles.error : null,
        ]}
      />
      {error && <Text style={styles.errorLabel}>{error.message}</Text>}
    </View>
  );
};

export default TextField;
