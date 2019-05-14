import { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';

export default class Modal extends Component {
  static toastArr = [];

  static show(element) {
    const toast = new RootSiblings(element);
    Modal.toastArr.push(toast);
    return toast;
  }

  static hide = (toast) => {
    let toastObj;
    if (toast) {
      toastObj = toast;
      const index = Modal.toastArr.indexOf(toast);
      Modal.toastArr.splice(index, 1);
    } else {
      toastObj = Modal.toastArr.pop();
    }

    if (toastObj instanceof RootSiblings) {
      toastObj.destroy();
    } else {
      console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
    }
  };
}
