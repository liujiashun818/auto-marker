import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Actions } from 'react-native-router-flux';
import debounce from 'lodash.debounce';

import SafeComponent from '../../components/SafeComponent';
import Button from '../../components/Button';

import images from '../../images';

import styles from '../../styles';
import sStyles from './style/settings';
import BaseView from '../../components/BaseView/index';
import * as authActions from '../../redux/auth/actions';

class Settings extends SafeComponent {
  handleLogout() {
    const currentUser = this.props.currentUser || {};
    this.props.actions.logout(currentUser._id || '');
  }

  render() {
    return (
      <BaseView title="设置">

        <View style={styles.container}>
          <TouchableOpacity
            onPress={debounce(
              () => {
                Actions.Browser({ uri: 'https://www.shuidao.com/', navTitle: '水稻汽车' });
              },
              250,
              { leading: true, trailing: false },
            )}
          >
            <View style={[sStyles.sItem]}>
              <Text style={sStyles.sItemText}>官网</Text>
              <Text style={[sStyles.sItemText, sStyles.sItemLink]}>www.shuidao.com</Text>
            </View>
          </TouchableOpacity>
          <View style={sStyles.sItem}>
            <Text style={sStyles.sItemText}>版本信息</Text>
            <Text style={[sStyles.sItemText, sStyles.sItemData]}>
              {`${AData.AppVersion}.${AData.AppSecondVersion}(${AData.JsVersion})`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={debounce(() => Actions.About(), 250, { leading: true, trailing: false })}>
            <View style={sStyles.sItem}>
              <Text style={sStyles.sItemText}>关于我们</Text>
              <Image source={images.icon.arrowRight} />
            </View>
          </TouchableOpacity>

          <View style={[styles.mt20, styles.mb30]}>
            <Button
              buttonStyle={[styles.btn, styles.btnPrimary, sStyles.sSubmit]}
              textStyle={[styles.btnPrimaryText]}
              onPress={debounce(() => this.handleLogout(), 250, { leading: true, trailing: false })}
              title="退出登录"
            />
          </View>

        </View>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const {
    currentUser,
  } = state.auth;
  return {
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
