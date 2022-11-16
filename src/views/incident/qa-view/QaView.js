import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {AccordionList} from 'accordion-collapse-react-native';
import Pdf from 'react-native-pdf';

import {appStyles} from '../../../styles/constants';
import HeaderBox from '../../../components/HeaderBox';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  headView: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: MAIN_COLORS.ORANGE,
    borderColor: MAIN_COLORS.PRIMARY,
    borderWidth: 10,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 3,
    marginTop: 3,
  },
  bodyView: {padding: 10},
  titleIncidentCard: {
    color: MAIN_COLORS.SECONDARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descIncidentCard: {fontSize: 15},
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  blackText: {
    color: ADDITIONAL_COLORS.TEXT.GLOBAL,
  },
});

const QaView = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const source = {
    uri: 'https://deepit.pl/MojPojazd/oswiadczenie_sprawcy_kolizji_drogowej.pdf',
    cache: true,
  };
  const [list, setList] = useState([
    {
      id: 1,
      title: 'Czym jest wypadek drogowy?',
      body: (
        <View>
          <Text style={[styles.boldText, styles.blackText]}>
            Według definicji ze strony gov.pl, wypadek to:
          </Text>
          <Text style={styles.blackText}>
            "Zdarzenie mające miejsce w ruchu lądowym, spowodowane poprzez
            nieumyślne naruszenie zasad bezpieczeństwa obowiązujących w tym
            ruchu, którego skutkiem jest śmierć jednego z uczestników lub
            obrażania ciała powodujące naruszenie czynności narządu ciała lub
            rozstrój zdrowia trwające dłużej niż 7 dni.".
          </Text>
          <Text style={[styles.boldText, styles.blackText]}>
            Czym zatem jest kolizja? Według definicji:
          </Text>
          <Text style={styles.blackText}>
            "Podstawową różnicą pomiędzy kolizją a wypadkiem jest obecność
            poszkodowanych. - Mówi Kamil Sztandera, ekspert Rankomat.pl. -
            Kluczowe jest tutaj wystąpienie zgonu lub siedmiodniowy rozstrój
            zdrowia. Stąd wypadek zawsze jest kolizją, ale kolizja nie zawsze
            jest wypadkiem."
          </Text>
        </View>
      ),
    },
    {
      id: 2,
      title: 'Kiedy trzeba wezwać policję na miejsce zdarzenia drogowego?',
      body: (
        <View>
          <Text style={styles.blackText}>
            Wszyscy wiemy, że{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              wezwanie policji nie zawsze jest konieczne
            </Text>
            . Niekiedy uczestnicy zdarzenia drogowego wolą się "dogadać". W
            szczególności ma to miejsce, gdy:
          </Text>
          <FlatList
            listKey="0"
            data={[
              {key: 'obie strony są trzeźwe.'},
              {key: 'obie strony mają przy sobie dokumenty.'},
              {
                key: 'sprawca przyznaje się do winy lub nie ma co do tego wątpliwości.',
              },
            ]}
            renderItem={({item}) => (
              <Text style={styles.blackText}>{'\u2022 ' + item.key}</Text>
            )}
          />
          <Text style={styles.blackText}>
            Wówczas sprawca zdarzenia zostawia swoje dane osobowe i
            ubezpieczeniowe lub pokrywa szkodę ze swoich pieniędzy, gdy naprawdę
            mu się spieszy.
          </Text>
          <Text style={styles.blackText}>
            Są jednak{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              sytuacje, w których należy wezwać policję
            </Text>
            . Trzeba to zrobić, gdy:
          </Text>
          <FlatList
            listKey="1"
            data={[
              {key: 'w zdarzeniu są poszkodowani.'},
              {
                key: 'nie możemy ustalić sprawcy zdarzenia lub są co do tego wątpliwości.',
              },
              {
                key: 'mamy podejrzenie, że sprawca znajduje się pod wpływem alkoholu.',
              },
              {key: 'sprawca oddalił się z miejsca zdarzenia.'},
              {key: 'sprawca nie ma dokumentów.'},
              {key: 'mieliśmy kolizję z pojazdem zarejestrowanym za granicą.'},
              {key: 'sprawcą kolizji jest rowerzysta.'},
              {key: 'w kolizji uczestniczą trzy pojazdy lub więcej.'},
            ]}
            renderItem={({item}) => (
              <Text style={styles.blackText}>{'\u2022 ' + item.key}</Text>
            )}
          />
        </View>
      ),
    },
    {
      id: 3,
      title: 'Zasady postępowania podczas wypadku drogowego',
      body: (
        <View>
          <Text style={styles.blackText}>
            Jeżeli już stało się najgorsze i brałeś udział w wypadku, powinieneś
            zrobić kilka rzeczy.
          </Text>
          <Text style={styles.blackText}>
            1.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Sprawdź, czy są poszkodowani, i oceń ich stan
            </Text>{' '}
            - W wypadku najważniejszy jest człowiek. Na samym początku zobacz,
            czy są ranni.{' '}
          </Text>
          <Text style={styles.blackText}>
            2.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Wezwij służby
            </Text>{' '}
            - Telefon pod numer 112 i podanie zgłoszenia powinno wystarczyć.
            Dyspozytor wezwie policję i pogotowie lub straż pożarną, jeśli jest
            taka konieczność.{' '}
          </Text>
          <Text style={styles.blackText}>
            3.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Zabezpiecz miejsce zdarzenia
            </Text>{' '}
            - W pierwszej kolejności musisz{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              zadbać o swoje bezpieczeństwo,
            </Text>{' '}
            dopiero w dalszej kolejności o poszkodowanych. Chyba nie chcesz,
            żeby ktoś w Ciebie wjechał, kiedy będziesz prowadził RKO, prawda?
            Zasłoń miejsce swoim samochodem, włącz światła awaryjne oraz
            postojowe, ustaw trójkąt ostrzegawczy. Jeśli jest taka potrzeba,
            zatrzymaj inny samochód i poproś o pomoc.{' '}
          </Text>
          <Text style={styles.blackText}>
            4.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Udziel pierwszej pomocy
            </Text>{' '}
            - Podczas kursu na prawo jazdy odbyłeś szkolenie z pierwszej pomocy.
            Postępuj według niego.
          </Text>
          <Text style={styles.blackText}>
            5.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Udokumentuj przebieg zdarzenia
            </Text>{' '}
            - Wszelkie informacje, które mogą mieć znaczenie w toku postępowania
            lub dla uzyskania świadczenia z OC, są ważne. Jeśli inni uczestnicy
            zdarzenia są w stanie, zbierz ich dane - imię, nazwisko, numer
            polisy.{' '}
          </Text>
          <Text style={styles.blackText}>
            6.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Poczekaj na przyjazd służb
            </Text>{' '}
            - Wraz z przybyciem policji lub pogotowia ratunkowego twoja rola się
            kończy. Pozostaje Ci udzielić wyjaśnień i odpowiedzieć na pytania
            dotyczące okoliczności zdarzenia.
          </Text>
          <Text style={styles.blackText}>
            7.{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              Zgłoś wypadek do towarzystwa ubezpieczeniowego
            </Text>{' '}
            - Jeśli jesteś poszkodowany lub masz autocasco, możesz ubiegać się o
            odszkodowanie za uszkodzenia auta lub uszczerbek na zdrowiu.
            Dodatkowo jeżeli Twoje auto nie nadaje się do jazdy, możesz
            potrzebować samochodu zastępczego. Dostaniesz samochód zastępczy z
            OC sprawcy.{' '}
          </Text>
        </View>
      ),
    },
    {
      id: 4,
      title: 'Wypadek a ubezpieczenie - co wpisać w oświadczeniu?',
      body: (
        <View>
          <Text style={styles.blackText}>
            W oświadczeniu spisywanym po kolizji powinna pojawić się{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              klarowna informacja wskazująca sprawcę oraz opis zdarzenia
            </Text>
            . Sprawca powinien poświadczyć przyznanie się do winy na piśmie.
            Gotowe formularze często rozdawane przez towarzystwa ubezpieczeniowe
            podczas podpisywania polisy OC z reguły zawierają rubryki: "Sprawca"
            oraz "Poszkodowany". Wówczas wystarczy, że sprawca wpisze swoje dane
            w odpowiedniej rubryce i złoży czytelny podpis pod oświadczeniem.
          </Text>
          <Text style={styles.blackText}>Poza tym należy uwzględnić:</Text>
          <FlatList
            data={[
              {key: 'datę, godzinę i miejsce zdarzenia,'},
              {
                key: 'pełne dane sprawcy spisane z dowodu osobistego i rejestracyjnego, prawa jazdy a także polisy OC.',
              },
            ]}
            renderItem={({item}) => (
              <Text style={styles.blackText}>{'\u2022 ' + item.key}</Text>
            )}
          />
          <Text style={styles.blackText}>
            Z dokumentu ubezpieczenia należy spisać{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              informacje o firmie ubezpieczeniowej sprawcy i numerze polisy
            </Text>
            . Pamiętaj także, aby upewnić się, czy badania techniczne auta są
            aktualne.
          </Text>
          <Text style={styles.blackText}>
            Jeżeli Twój samochód nie nadaje się do jazdy, wezwij pomoc drogową.
            Warto również sfotografować miejsce zdarzenia oraz pojazd.{' '}
          </Text>
        </View>
      ),
    },
    {
      id: 5,
      title: 'Oświadczenie sprawcy kolizji drogowej',
      body: (
        <View>
          <Pdf
            trustAllCerts={false}
            source={source}
            onError={error => {
              console.log(error);
            }}
            style={styles.pdf}
          />
        </View>
      ),
    },
    {
      id: 6,
      title: 'Źródło',
      body: (
        <View>
          <Text style={styles.blackText}>
            <Text style={[styles.boldText, styles.blackText]}>
              Jak postępować w razie wypadku drogowego?
            </Text>{' '}
            [krok po kroku],
            https://rankomat.pl/samochod/jak-postepowac-w-razie-wypadku{' '}
            <Text style={[styles.boldText, styles.blackText]}>
              [Dostęp: 16.11.2022 r.]
            </Text>
          </Text>
        </View>
      ),
    },
  ]);
  const head = item => {
    return (
      <View style={styles.headView}>
        <Text style={[styles.titleIncidentCard, styles.shadowText]}>
          {item.title}
        </Text>
      </View>
    );
  };
  const body = item => {
    return <View style={styles.bodyView}>{item.body}</View>;
  };
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <HeaderBox
          title="Procedury postępowania"
          icon="lightbulb-o"
          fontSize={18}
          marginVertical={15}
        />
        <View style={{marginBottom: 15}}>
          <AccordionList
            list={list}
            header={head}
            body={body}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QaView;
