import { StyleSheet, Platform } from 'react-native';
import { NavBarHeight, StatusBarHeight, ScreenWidth } from '../../../styles/sizes';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  bottomAction: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  btnBlock: {
    flex: 0.33,
    height: 50,
    backgroundColor: colors.yellow,
  },
  bottomActionPrice: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  Direction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  priceDetail: {
    backgroundColor: '#fff',
    width: ScreenWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  detailView: {
    width: ScreenWidth / 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  border: {
    marginTop: 15,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  lineRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 5,
  },
  ActiveBorder: {
    borderColor: '#2B94FF',
    backgroundColor: '#2B94FF',
  },
  selectColor: {
    color: '#fff',
  },
  InactiveBorder: {
    borderColor: '#2B94FF',
  },
  blueColor: {
    color: '#2B94FF',
  },
  btnNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginRight: 10,
  },
  modal: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? (StatusBarHeight + NavBarHeight) : NavBarHeight,
    backgroundColor: 'rgba(127, 127, 127, .7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 15,
    marginHorizontal: (ScreenWidth - 300) / 2,
    alignItems: 'center',
  },
  ModalInput: {
    height: 60,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  textInput: {
    borderColor: colors.borderColor,
    borderWidth: 1,
    flex: 1,
    paddingLeft: 10,
  },
  moneyStyle: {
    height: 60,
    backgroundColor: '#f1f1f1',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRightWidth: 0,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.defaultText,
  },
  Submit: {
    flex: 0,
    height: 50,
    width: ScreenWidth * 0.45,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalTitle: {
    width: ScreenWidth - ((ScreenWidth - 300)),
    marginBottom: 20,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 25,
  },
  carImage: {
    width: ScreenWidth,
    height: 200,
  },
  borderTop: {
    borderColor: colors.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
