import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  tabTitle: {
    fontSize: 11,
    color: '#303234',
  },
});

export default style;
