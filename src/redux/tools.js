import MiPush from 'react-native-mipush';

/**
 * set Mi_Push alias
 */
export function setUserMiPushAlias(userInfo = null) {
  if (userInfo) {
    if (userInfo.status === -1) {
      MiPush.unsetAlias(userInfo._id);
    } else {
      MiPush.setAlias(userInfo._id);
    }
  }
}

/**
 * unset Mi_Push alias
 */
export function unsetUserMiPushAlias(userInfo = null) {
  if (userInfo) {
    MiPush.unsetAlias(userInfo._id);
  }
}

const tools = {
  setUserMiPushAlias,
  unsetUserMiPushAlias,
};

export default tools;
