import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 999,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinner: {
    flex: 0,
  },
});
