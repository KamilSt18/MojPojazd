import {ADDITIONAL_COLORS, MAIN_COLORS} from './colors';

export const appStyles = {
  root: {
    backgroundColor: MAIN_COLORS.SECONDARY,
    flex: 1,
    height: '100%',
    color: ADDITIONAL_COLORS.TEXT.GLOBAL,
  },
  section: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: MAIN_COLORS.PRIMARY,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  // Modal
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

  shadowText: {
    textShadowColor: 'rgba(58,58,58, 0.25)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 0.1,
  },
  formatText: {
    color: MAIN_COLORS.SECONDARY,
    fontSize: 15,
    // fontWeight: '500',
  },
  importantText: {
    fontWeight: 'bold',
    color: ADDITIONAL_COLORS.TEXT.PARMESEAN,
  },
  boldText: {fontWeight: 'bold'},
  label: {
    color: ADDITIONAL_COLORS.TEXT.BLACK,
    fontSize: 17,
    marginTop: 8,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
};
