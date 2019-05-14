import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import Button from 'apsl-react-native-button';
import debounce from 'lodash.debounce';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import Loading from '../../components/Loading/index';

import styles from '../../styles';
import style from './style';

import { getAuthCode, login } from '../../redux/auth/actions';

function mapStateToProps(state) {
  const {
    authCodePhone,
    authCodeRequireId,
    authCodeRequireTime,
    loginRequiring,
  } = state.auth;
  return {
    authCodePhone,
    authCodeRequireId,
    authCodeRequireTime,
    loginRequiring,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getAuthCode, login }, dispatch),
  };
}

class Login extends SafeComponent {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      phone: '',
      code: '',
      time: 60,
    };

    [
      'handlePhoneChange',
      'handleCodeChange',
      'handleGetCode',
      'handleLogin',
      'getCodeShouldDisable',
      'loginShouldDisable',
      'tick',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePhoneChange(phone) {
    this.safeSetState({ phone });
  }

  handleCodeChange(code) {
    this.safeSetState({ code });
  }

  handleGetCode() {
    this.interval = setInterval(this.tick, 1000);
    this.props.actions.getAuthCode(this.state.phone, this.props.authCodeRequireId);
  }

  handleLogin() {
    const { phone, code } = this.state;
    const { authCodeRequireId } = this.props;
    this.props.actions.login(phone, code, authCodeRequireId);
  }

  getCodeShouldDisable() {
    const { phone, time } = this.state;
    return !(phone.length === 11 && time === 60);
  }

  loginShouldDisable() {
    const { authCodePhone } = this.props;
    const { phone, code } = this.state;
    return !(phone.length === 11 && code.length === 6 &&
      (!authCodePhone || authCodePhone === phone));
  }

  tick() {
    const { time } = this.state;
    if (time > 0) {
      this.safeSetState({ time: this.state.time - 1 });
    } else {
      clearInterval(this.interval);
      this.safeSetState({
        time: 60,
      });
    }
  }

  render() {
    const { loginRequiring } = this.props;
    const { phone, code, time } = this.state;

    const getCodeDisable = this.getCodeShouldDisable();
    const loginDisable = this.loginShouldDisable();
    const getCodeText = time < 60 ? `重新获取(${time})` : '获取验证码';

    return (
      <BaseView title="登录" leftButton={null}>
        <ScrollView
          style={styles.container}
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.container}
        >
          <Loading isLoading={loginRequiring} />

          <View style={style.loginForm}>
            <View style={[style.formGroup]}>
              <Text style={style.formLabel}>手机号</Text>
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={this.handlePhoneChange}
                style={[style.textInput]}
                keyboardType="phone-pad"
                placeholder={'输入手机号'}
                placeholderTextColor="#ccc"
                defaultValue={phone}
                maxLength={11}
              />
              <View>
                <Button
                  isDisabled={getCodeDisable}
                  style={style.btnGetCode}
                  textStyle={getCodeDisable
                    ? style.getCodeTextDisable
                    : style.getCodeText}
                  onPress={debounce(this.handleGetCode, 250, { leading: true, trailing: false })}
                >
                  {getCodeText}
                </Button>
              </View>
            </View>

            <View style={[style.formGroup, style.borderBottom]}>
              <Text style={style.formLabel}>验证码</Text>
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={this.handleCodeChange}
                style={[style.textInput]}
                keyboardType="phone-pad"
                placeholder={'输入验证码'}
                placeholderTextColor="#ccc"
                defaultValue={code}
                maxLength={6}
              />
            </View>

            <View style={style.btnLoginContainer}>
              <Button
                isDisabled={loginDisable}
                style={[style.btnLogin]}
                textStyle={style.loginText}
                onPress={debounce(this.handleLogin, 250, { leading: true, trailing: false })}
              >
                立即登录
              </Button>
            </View>
          </View>
        </ScrollView>
      </BaseView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
