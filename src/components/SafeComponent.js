// SafeComponent 替换 Component，safeSetState 替换 setState
import {Component} from 'react';
import ReactUpdateQueue from 'ReactUpdateQueue';

export default class SafeComponent extends Component {
  safeSetState(state) {
    if (ReactUpdateQueue.isMounted(this)) {
      this.setState(state);
    }
  }
}
