import React, {createContext, useContext, useEffect} from 'react';
import {IntlProvider} from 'react-intl';
import {findBestAvailableLanguage} from 'react-native-localize';

import {getMessages} from './utils';
import {LANGUAGES, LANG_CONTEXT_NAME, LC_LANG_KEY} from './constants';
import {getItem, setItem} from '../utils/asyncStorage';

export const LangContext = createContext();
LangContext.displayName = LANG_CONTEXT_NAME;

export function LangModeProvider(props) {
  const [lang, setLang] = React.useState(LANGUAGES.ENG);

  useEffect(() => {
    const getLanguage = (async () => {
      const lcLang = await getItem(LC_LANG_KEY);
      const bestLanguage = findBestAvailableLanguage(
        Object.values(LANGUAGES),
      ).languageTag;
      if (lcLang) {
        setLang(lcLang);
      } else if (bestLanguage) {
        setLang(bestLanguage);
      } else {
        setLang(LANGUAGES.PL);
      }
    })();
  }, [lang]);

  async function switchLang(newLang) {
    await setItem(LC_LANG_KEY, newLang);
    setLang(newLang);
  }

  const value = [lang, switchLang];

  return <LangContext.Provider value={value} {...props} />;
}

export default function LangWrapper({children}) {
  const [lang] = useContext(LangContext);
  return (
    <IntlProvider
      locale={lang ? lang : LANGUAGES.PL}
      defaultLocale={LANGUAGES.PL}
      messages={getMessages(lang)}>
      {children}
    </IntlProvider>
  );
}
