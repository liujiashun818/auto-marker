import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View, } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Permissions from 'react-native-permissions';
import debounce from 'lodash.debounce';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import Loading from '../../components/Loading';

import images from '../../images';
import styles from '../../styles/index';
import pStyles from './style/profile';

import AvatarUploader from './AvatarUploader';

import { getUserInfo } from '../../redux/auth/actions';
import { saveAvatarImg } from '../../redux/user/actions';

class Profile extends SafeComponent {
  constructor(props) {
    super(props);

    [
      'handlePressUser',
      'handlePressCustomer',
      'handlePressDial',
      'handlePressSetting',
      'avatarUploadFinish',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.props.actions.getUserInfo();
  }

  handlePressUser() {
    Actions.ProfileEdit();
  }

  handlePressCustomer() {
    Actions.CustomerIndex();
  }

  handlePressDial() {
    AConfig.dialCustomerService();
  }

  handlePressSetting() {
    Actions.Settings();
  }

  avatarUploadFinish(imageInfo, imageKey, error) {
    if (error) {
      // Alert.alert('提示', error);
      // Message.show(error);
      Alert.alert('提示', error, [
        {
          text: '取消',
          style: 'cancel',
        }, {
          text: '设置',
          onPress: Permissions.openSettings,
        },
      ]);
    }
    if (!(imageInfo && imageKey)) {
    } else {
      this.props.actions.saveAvatarImg(imageKey, imageInfo.imageUri);
    }
  }

  render() {
    const currentUser = this.props.currentUser || {};
    const { isUploading, avatarImgUri } = this.props;

    return (
      <BaseView title="个人信息" leftButton={null}>
        <Loading isLoading={isUploading} />

        <View style={pStyles.topBanner}>
          <View style={pStyles.avatarWrapper}>
            <AvatarUploader
              style={pStyles.avatar}
              sourcePlaceholder={images.im.defaultAvatar}
              imageName={currentUser.avatar_pic}
              imageUri={avatarImgUri}
              pickerOptions={AConfig.imageCropPickerOption.avatar}
              uploadFinish={this.avatarUploadFinish}
            />
          </View>

          <View style={[styles.flexColumnLeft, styles.ml15]}>
            <Text style={pStyles.userName}>{currentUser.name}</Text>
            <Text style={pStyles.userCompany}>{currentUser.company_name}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={debounce(this.handlePressCustomer, 250, { leading: true, trailing: false })}
        >
          <View style={pStyles.pItem}>
            <Image style={pStyles.pItemIcon} source={images.icon.iconSkills} />
            <Text style={pStyles.pItemText} numberOfLines={1}>我的客户</Text>
            <Image source={images.icon.arrowRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={debounce(this.handlePressDial, 250, { leading: true, trailing: false })}
        >
          <View style={pStyles.pItem}>
            <Image style={pStyles.pItemIcon} source={images.icon.iconDial} />
            <Text style={pStyles.pItemText} numberOfLines={1}>联系客服</Text>
            <Image source={images.icon.arrowRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={debounce(this.handlePressSetting, 250, { leading: true, trailing: false })}
        >
          <View style={pStyles.pItem}>
            <Image style={pStyles.pItemIcon} source={images.icon.iconInfo} />
            <Text style={pStyles.pItemText} numberOfLines={1}>设置</Text>
            <Image source={images.icon.arrowRight} />
          </View>
        </TouchableOpacity>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  const {
    isUploading,
    avatarImg,
    avatarImgUri,
  } = state.user;

  return { currentUser, isUploading, avatarImg, avatarImgUri };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getUserInfo, saveAvatarImg }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
