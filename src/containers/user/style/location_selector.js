import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  lsFirstCell: {
    paddingHorizontal: 10,
  },

  lsCell: {
    height: 50,
    backgroundColor: '#fff',

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },

  lsLocationIcon: {
    width: 30,
    height: 20,
    paddingHorizontal: 10,
  },

  lsCurrentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  lsCurrentLocation: {
    flex: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  lsSelectContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  lsList: {
    flex: 1,
    overflow: 'hidden',
  },
  lsListBorderHorizontal: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#ccc',
  },
  lsSectionHeader: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  lsSectionHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },

});
