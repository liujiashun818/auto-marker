import { Alert, Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';

const TOAST_MARGIN_BOTTOM = -70;

/**
 * 在页面展示消息
 */
class Message {

  /**
   * show toast bar on the bottom of the page
   * @param msg
   * @type [String]
   */
  static show(msg) {
    if (Platform.OS === 'ios') {
      Toast.show(msg, { position: TOAST_MARGIN_BOTTOM });
    } else {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    }
  }

  /** todo
   * show toast square on the center of the page
   * @param msg
   */
  static squareToastOk() {

  }

  /** todo
   * show toast square on the center of the page
   * @param msg
   */
  static squareToastError() {

  }

  static alert(msg) {
    Alert.alert(
      '提示',
      msg,
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel',
        }, {
        text: '确定',
        onPress: () => {},
      },
      ],
      {
        cancelable: false,
      },
    );
  }
}

export default Message;
