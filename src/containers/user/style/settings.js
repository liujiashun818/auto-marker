import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  sItemText: {
    width: 90,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },

  sItemLink: {
    flex: 1,
    textAlign: 'right',
    color: '#52b3ff',
  },

  sItemData: {
    flex: 1,
    textAlign: 'right',
  },

  sSubmit: {
    flex: 0,
    height: 40,
    width: 180,
    alignSelf: 'center',
  },

});
