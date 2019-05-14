import {
  Platform,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  // Modal Root
  modal: {
    width: AData.ScreenWidth,
    height: AData.ScreenHeight - (Platform.OS === 'android' ? 20 : 0),
    marginTop: Platform.OS === 'android' ? 0 : 0,
    backgroundColor: 'rgba(127, 127, 127, .7)',

    justifyContent: 'flex-end',
  },

  actionSheetContainer: {
    backgroundColor: '#f1f1f1',
  },

  titleView: {
    minHeight: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  subTitleText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginTop: 10,
  },

  actionView: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionViewDisabled: {
    backgroundColor: '#eee',
  },

  actionViewCancel: {
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  actionImage: {
    width: 26,
    height: 26,
    marginRight: 10,
  },

});

export default styles;
