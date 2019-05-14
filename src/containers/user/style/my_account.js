import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  borderDev: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
  },

  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },

  withdraw: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  withdrawTitle: {
    fontSize: 16,
    color: '#666',
  },
  withdrawAmount: {
    fontSize: 36,
    color: '#333',
    marginTop: 10,
  },

  recharge: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#cccccc',
  },
  rechargeLeft: {},
  rechargeRight: {},

  rechargeLeftTitle: {
    fontSize: 16,
    color: '#999999',
  },
  rechargeLeftAccount: {
    fontSize: 16,
    color: '#333333',
    marginTop: 5,
  },

  rechargeBtn: {
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd500',
    borderRadius: 4,
    overflow: 'hidden',
  },
  rechargeText: {
    fontSize: 18,
    color: '#333333',
  },
  recordList: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    justifyContent: 'space-between',
  },
  detailFont: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 5,
  },
  timeFont: {
    fontSize: 13,
    color: '#999',
  },
  priceFont: {
    fontSize: 16,
    color: '#f5A623',
  },
  priceNormalFont: {
    fontSize: 16,
    color: '#666',
  },
  showIncome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 25,
  },
  text: {
    fontSize: 14,
    color: '#303234',
    lineHeight: 20,
  },
  selectBar: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
});
