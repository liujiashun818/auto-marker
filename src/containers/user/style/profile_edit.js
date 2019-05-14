import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  peItem: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  peItemIcon: {
    width: 20,
    height: 20,
  },

  peItemText: {
    width: 90,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },

  peItemData: {
    flex: 1,
    marginHorizontal: 10,
  },

  peAvatar: {
    width: 60,
    height: 60,
    borderColor: '#999',
    borderRadius: 30,
    overflow: 'hidden',
    marginHorizontal: 10,
  },

  peTip: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  peTipText: {
    fontSize: 12,
    color: '#666',
  },

  adoptStatusWaiting: {
    height: 40,
    backgroundColor: '#ffd500',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adoptStatusWaitingText: {
    fontSize: 14,
    color: '#666',
  },
  adoptStatusFail: {
    height: 40,
    backgroundColor: '#ff4200',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adoptStatusFailText: {
    fontSize: 14,
    color: '#fff',
  },
});
