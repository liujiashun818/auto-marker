import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    height: 85,
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },

  msgBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    marginRight: 10,
  },

  title: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },

  content: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    flex: 1,
  },

  tinyBar: {
    width: 24,
    height: 2,
    borderRadius: 6,
    backgroundColor: '#999',
  },
});

export default style;
