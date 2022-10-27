import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {LangContext} from '../../lang/LangProvider';
import {LANGUAGES} from '../../lang/constants';

export default function HomeView({navigation}) {
  const [lang, handleChangeLanguage] = useContext(LangContext);
  return (
    <View>
      <Text>
        <FormattedMessage defaultMessage={'Hello'} id={'hello'} />
      </Text>
      <Button
        title={'Change language'}
        onPress={() => {
          handleChangeLanguage(
            lang === LANGUAGES.PL ? LANGUAGES.ENG : LANGUAGES.PL,
          );
        }}
      />
    </View>
  );
}
