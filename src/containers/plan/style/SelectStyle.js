import { StyleSheet } from 'react-native';
import { ScreenWidth } from '../../../styles/sizes';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  topCityContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagLarge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: (ScreenWidth - 60) / 3,
    height: 37,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  ActiveBorder: {
    borderColor: colors.blue,
  },
  selectColor: {
    color: colors.blue,
  },
  InactiveBorder: {
    borderColor: '#d6d6d6',
  },
  Tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  firstView: {
    backgroundColor: '#fff',
  },
  listItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bottomAction: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  btnBlock: {
    flex: 7,
    height: 50,
    backgroundColor: colors.yellow,
  },
  btnOne: {
    flex: 3,
    height: 50,
    marginRight: 10,
  },
});
