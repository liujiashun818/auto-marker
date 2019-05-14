import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import colors from './colors';

const C_NAV_BAR_HEIGHT = 64;
const C_TAB_BAR_HEIGHT = 55;
const C_ACTION_BAR_HEIGHT = 54;
const C_ACTION_BUTTON_HEIGHT = 44;

/**
 * 屏幕大小
 */
const screenWindow = Dimensions.get('window');
export const screenWidth = screenWindow.width;
export const screenHeight = screenWindow.height;
export const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const navBarHeight = 44;

const style = StyleSheet.create({

  // View Container
  container: {
    flex: 1,
    backgroundColor: colors.viewBG,
  },

  withBottomBar: {
    paddingBottom: 50,
  },

  flexBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hide: {
    display: 'none',
  },

  // Margin
  m5: { margin: 5 },
  m10: { margin: 10 },
  m15: { margin: 15 },
  m20: { margin: 20 },
  m25: { margin: 25 },
  m30: { margin: 30 },

  mt5: { marginTop: 5 },
  mt10: { marginTop: 10 },
  mt15: { marginTop: 15 },
  mt20: { marginTop: 20 },
  mt25: { marginTop: 25 },
  mt30: { marginTop: 30 },

  mr5: { marginRight: 5 },
  mr10: { marginRight: 10 },
  mr15: { marginRight: 15 },
  mr20: { marginRight: 20 },
  mr25: { marginRight: 25 },
  mr30: { marginRight: 30 },

  mb5: { marginBottom: 5 },
  mb10: { marginBottom: 10 },
  mb15: { marginBottom: 15 },
  mb20: { marginBottom: 20 },
  mb25: { marginBottom: 25 },
  mb30: { marginBottom: 30 },

  ml5: { marginLeft: 5 },
  ml10: { marginLeft: 10 },
  ml15: { marginLeft: 15 },
  ml20: { marginLeft: 20 },
  ml25: { marginLeft: 25 },
  ml30: { marginLeft: 30 },

  mh5: { marginHorizontal: 5 },
  mh10: { marginHorizontal: 10 },
  mh15: { marginHorizontal: 15 },
  mh20: { marginHorizontal: 20 },
  mh25: { marginHorizontal: 25 },
  mh30: { marginHorizontal: 30 },

  mv5: { marginVertical: 5 },
  mv10: { marginVertical: 10 },
  mv15: { marginVertical: 15 },
  mv20: { marginVertical: 20 },
  mv25: { marginVertical: 25 },
  mv30: { marginVertical: 30 },

  mt8: { marginTop: 8 },
  mt40: { marginTop: 40 },
  mt60: { marginTop: 60 },
  ml12: { marginLeft: 12 },

  // Padding
  p5: { padding: 5 },
  p10: { padding: 10 },
  p15: { padding: 15 },
  p20: { padding: 20 },
  p25: { padding: 25 },
  p30: { padding: 30 },

  pt5: { paddingTop: 5 },
  pt10: { paddingTop: 10 },
  pt15: { paddingTop: 15 },
  pt20: { paddingTop: 20 },
  pt25: { paddingTop: 25 },
  pt30: { paddingTop: 30 },

  pr5: { paddingRight: 5 },
  pr10: { paddingRight: 10 },
  pr15: { paddingRight: 15 },
  pr20: { paddingRight: 20 },
  pr25: { paddingRight: 25 },
  pr30: { paddingRight: 30 },

  pb5: { paddingBottom: 5 },
  pb10: { paddingBottom: 10 },
  pb15: { paddingBottom: 15 },
  pb20: { paddingBottom: 20 },
  pb25: { paddingBottom: 25 },
  pb30: { paddingBottom: 30 },

  pl5: { paddingLeft: 5 },
  pl10: { paddingLeft: 10 },
  pl15: { paddingLeft: 15 },
  pl20: { paddingLeft: 20 },
  pl25: { paddingLeft: 25 },
  pl30: { paddingLeft: 30 },

  ph5: { paddingHorizontal: 5 },
  ph10: { paddingHorizontal: 10 },
  ph15: { paddingHorizontal: 15 },
  ph20: { paddingHorizontal: 20 },
  ph25: { paddingHorizontal: 25 },
  ph30: { paddingHorizontal: 30 },

  pv5: { paddingVertical: 5 },
  pv10: { paddingVertical: 10 },
  pv15: { paddingVertical: 15 },
  pv20: { paddingVertical: 20 },
  pv25: { paddingVertical: 25 },
  pv30: { paddingVertical: 30 },

  // Border
  bw1: {
    borderBottomWidth: 1,
  },
  bwHair: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  // FontSize
  f12: { fontSize: 12 },
  f14: { fontSize: 14 },
  f16: { fontSize: 16 },
  f18: { fontSize: 18 },
  f20: { fontSize: 20 },
  f22: { fontSize: 22 },
  f24: { fontSize: 24 },
  f26: { fontSize: 26 },
  f28: { fontSize: 28 },
  f30: { fontSize: 30 },
  f32: { fontSize: 32 },
  f34: { fontSize: 34 },
  f36: { fontSize: 36 },
  f38: { fontSize: 38 },
  f40: { fontSize: 40 },

  fontBold: {
    fontWeight: '500',
  },

  // FontColor
  // default
  fdf: { color: colors.defaultText },
  // primary
  fpr: { color: colors.primaryText },
  // white
  fwh: { color: colors.whiteText },
  // gray
  fgr: { color: colors.grayText },

  // Text Align: ["auto","left","right","center","justify"]
  taa: { textAlign: 'auto' },
  tal: { textAlign: 'left' },
  tar: { textAlign: 'right' },
  tac: { textAlign: 'center' },
  taj: { textAlign: 'justify' },

  // Text Align Vertical: ["auto","top","bottom","center"]
  tava: { textAlignVertical: 'auto' },
  tavt: { textAlignVertical: 'top' },
  tavb: { textAlignVertical: 'bottom' },
  tavc: { textAlignVertical: 'center' },

  // Components
  // Spinner
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },

  // Nav bar button
  navBarLeftButton: {
    paddingLeft: 5,
  },

  navBarRightButton: {
    paddingRight: 5,
  },

  // Bottom Action Bar & Buttons
  actions: {
    height: C_ACTION_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    backgroundColor: colors.white,
  },

  btn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnDefault: {
    backgroundColor: colors.btnDefault,
    borderColor: colors.btnDefault,
  },
  btnPrimary: {
    backgroundColor: colors.btnPrimary,
    borderColor: colors.btnPrimary,
  },
  btnWhite: {
    backgroundColor: colors.btnWhite,
    borderColor: colors.btnWhite,
  },
  btnDisable: {
    backgroundColor: colors.btnDisable,
    borderColor: colors.btnDisable,
  },

  btnDefaultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.whiteText,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.defaultText,
  },

  btnSelect: {
    height: 30,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSelectText: {
    color: colors.defaultText,
  },

  btnSelectActive: {
    borderColor: colors.blue,
  },
  btnSelectTextActive: {
    color: colors.blue,
  },

  // nav button
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    height: 42,
    marginLeft: 12,
    backgroundColor: '#ffd500',
  },
  btnBackFont: {
    fontSize: 16,
    color: '#303234',
    marginLeft: 8,
  },

  btnRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    height: 42,
    backgroundColor: '#ffd500',
  },

  // text

  textDefault: {
    color: colors.defaultText,
  },
  textGray: {
    color: colors.gray,
  },
  textOrange: {
    color: colors.orange,
  },
  textGreen: {
    color: colors.green,
  },
  textRed: {
    color: colors.red,
  },
  textPrimary: {
    color: colors.blue,
  },

  // border
  borderDefault: {
    borderColor: colors.lightGray,
  },
  withBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  noBorderBottom: {
    borderBottomWidth: 0,
  },
  noBorderTop: {
    borderTopWidth: 0,
  },

  // label

  label: {
    width: 80,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelDefault: {
    borderColor: colors.default,
  },
  labelDefaultText: {
    color: colors.default,
  },

  labelPrimary: {
    borderColor: colors.blue,
  },
  labelPrimaryText: {
    color: colors.blue,
  },

  labelWarning: {
    borderColor: colors.orange,
  },
  labelWarningText: {
    color: colors.orange,
  },

  // modal
  modal: {
    flex: 1,
    paddingTop: 30 + (Platform.OS === 'android' ? 43 : 63),
    backgroundColor: colors.modalBG,
  },
  modalContent: {
    backgroundColor: colors.modalViewBG,
    borderRadius: 6,
    padding: 15,
    marginHorizontal: 30,
    overflow: 'hidden',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  modalDesc: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },

  modalInput: {
    height: 40,
    fontSize: 14,
    borderRadius: 6,
    padding: 10,
    backgroundColor: colors.modalInputBG,
  },

  modalButtons: {
    height: C_ACTION_BUTTON_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

  // module

  leftBar: {
    height: 18,
    width: 6,
    marginRight: 10,
    backgroundColor: colors.yellow,
  },

  module: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  moduleTitle: {
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },

  moduleTitleWithArrow: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: '#fff',
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  moduleContentLine: {
    height: 40,
  },
  moduleContentRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  moduleRightArrow: {
    marginLeft: 8,
  },

  /**
   * form
   */

  formGroup: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  formGroupTitle: {
    height: 30,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formGroupTitleText: {
    fontSize: 12,
    color: '#666666',
  },
  formGroupBody: {
    paddingLeft: 10,
  },

  formControl: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  formListItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  formInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  formLabel: {
    width: 60,
    color: colors.default,
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
  },

  /**
   * 列表头部选择器
   */
  topConditionBar: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  topBannerItem: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /**
   * mask
   */
  mask: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: colors.mask,
    width: screenWidth,
    height: screenHeight,
  },

  maskContent: {
    backgroundColor: colors.white,
  },

  maskContentList: {},
  maskContentListItem: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  maskContentListItemTextActive: {
    color: colors.blue,
  },

  maskContentModule: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
  },

  /**
   * layout
   */
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  flexRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /**
   * column
   */
  flexColumnLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexColumnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColumnRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

});

export default style;
