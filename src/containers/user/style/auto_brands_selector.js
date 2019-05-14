import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  absCell: {
    height: 50,
    backgroundColor: '#fff',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },

  absCellImg: {
    width: 40,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
  },
  absCellTitle: {
    flex: 1,
    marginHorizontal: 10,
  },
  absCellCheckImg: {
    width: 25,
    height: 25,
  },

  absLocationIcon: {
    width: 30,
    height: 20,
    paddingHorizontal: 10,
  },

  absCurrentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  absCurrentLocation: {
    flex: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  absSelectContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  absList: {
    flex: 1,
    overflow: 'hidden',
  },
  absSectionHeader: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  absSectionHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },

});
