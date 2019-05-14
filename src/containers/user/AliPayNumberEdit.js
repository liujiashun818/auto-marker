import React, { PropTypes } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView/index';
import SafeComponent from '../../components/SafeComponent';

import styles from '../../styles';
import peStyles from './style/profile_edit';
import sStyles from './style/settings';

export default class EditAliPay extends SafeComponent {
  static propTypes = {
    aliPayNumber: PropTypes.string,
    onFinish: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      aliPayNumber: this.props.aliPayNumber,
    };

    [
      'handlePressDone',
      'handleEditAlipayNumber',
    ].map(method => this[method] = this[method].bind(this));
  }

  handlePressDone() {
    const { onFinish } = this.props;
    const { aliPayNumber } = this.state;

    // if (aliPayNumber) {
    onFinish && onFinish(aliPayNumber);
    Actions.pop();
    // } else {
    //   Toast.show('请完善支付宝账号信息', { position: -70 });
    // }
  }

  handleEditAlipayNumber(aliPayNumber) {
    this.safeSetState({ aliPayNumber });
  }

  render() {
    const { aliPayNumber } = this.state;

    let rightButton = {
      title: '完成',
      tintColor: '#fff',
      handler: this.handlePressDone,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title="设置支付宝账号" rightButton={rightButton}>
        <View style={styles.container}>
          <View style={sStyles.sItem}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[peStyles.peItemText, { flex: 1 }]}
              defaultValue={aliPayNumber}
              onChangeText={this.handleEditAlipayNumber}
              placeholder={'请输入支付宝账号'}
              keyboardType="email-address"
              maxLength={64}
              autoFocus={true}
            />
          </View>
          <View style={[peStyles.peTip]}>
            <Text style={[peStyles.peTipText]}>此支付宝账号用于提现您的答题收益，请仔细核对</Text>
          </View>
        </View>

      </BaseView>
    );
  }
}
