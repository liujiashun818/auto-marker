import {
  Platform,
  StyleSheet,
} from 'react-native';
import { ScreenWidth, ScreenHeight } from '../../styles/sizes';

const styles = StyleSheet.create({
  // Modal Root
  modal: {
    width: ScreenWidth,
    height: ScreenHeight - (Platform.OS === 'android' ? 20 : 0),
    marginTop: Platform.OS === 'android' ? 0 : 0,
    backgroundColor: 'rgba(127, 127, 127, .7)',
    justifyContent: 'flex-end',
  },

  titleView: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  titleText: {
    fontSize: 14,
    color: '#999',
  },

  actionView: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenWidth / 2,
  },
  flexRow: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: '#f5f5f5',
    paddingBottom: 10,
  },
  actionViewDisabled: {
    backgroundColor: '#eee',
  },

  actionViewCancel: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 5,
  },
  newActionText: {
    fontSize: 18,
    color: '#333',
  },
  actionImage: {
    width: 60,
    height: 60,
    marginLeft: 5,
    marginBottom: 10,
  },

});

export default styles;
