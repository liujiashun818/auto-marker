import React from 'react';
import RootSibling from 'react-native-root-siblings';

import NotificationContainer from './NotificationContainer';

let rootSibling = null;

function destroy() {
  if (rootSibling) {
    rootSibling.destroy();
  }
}

export default class Notification {
  static show(msg, onClick) {
    rootSibling = new RootSibling(
      <NotificationContainer msg={msg} onClick={onClick} destroy={() => destroy()} />,
    );
    return rootSibling;
  }
}
