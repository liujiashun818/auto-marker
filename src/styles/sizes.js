import {
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

/**
 * 屏幕大小
 */
const screenWindow = Dimensions.get('window');
export const ScreenWidth = screenWindow.width;
export const ScreenHeight = screenWindow.height;

export const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const NavBarHeight = 44;
const Sizes = {
  ScreenWidth,
  ScreenHeight,
  StatusBarHeight,
  NavBarHeight,
};

export default Sizes;
