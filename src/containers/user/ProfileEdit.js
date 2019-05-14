import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Permissions from 'react-native-permissions';
import debounce from 'lodash.debounce';

import Message from '../../components/Message';
import SafeComponent from '../../components/SafeComponent';
import AvatarUploader from './AvatarUploader';
import images from '../../images';
import styles from '../../styles';
import peStyles from './style/profile_edit';
import colors from '../../styles/colors';
import BaseView from '../../components/BaseView/index';
import {
  resetArtificerInfo,
  setAliPayNumber,
  setAvatarImg,
  submitArtificerEdit,
} from '../../redux/user/actions';

class ProfileEdit extends SafeComponent {
  constructor(props) {
    super(props);

    [
      'handlePressAvatar',
      'avatarUploadFinish',
      'handlePressBack',
      'handlePressSubmit',
      'handleSelectBrand',
      'handleSelectCity',
      'handlePressAlipay',
    ].map(method => this[method] = this[method].bind(this));
  }

  handlePressAvatar() {
    this.refs['avatarUploader'].handlePress();
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
      this.props.actions.setAvatarImg(imageKey, imageInfo.imageUri);
    }
  }

  handlePressBack() {
    const { isEdited } = this.props;

    if (isEdited) {
      Alert.alert(
        '提示',
        '当前页面信息未保存，是否离开？',
        [
          { text: '取消' },
          { text: '确定', onPress: Actions.pop },
        ],
      );
    } else {
      Actions.pop();
    }
  }

  handlePressSubmit() {
    // 检查必填项
    const {
      aliPayNumber,
      currentProvince,
      currentCity,
      currentDistrict,
      skilledBrands,
      avatarImg,
    } = this.props;

    let error = '';
    if (!avatarImg) {
      error = '请选择并上传头像';
    } else if (!Object.keys(skilledBrands).length) {
      error = '请选择擅长车型品牌';
    } else if (!(currentProvince && currentCity && currentDistrict)) {
      error = '请选择所在城市';
      // } else if (!aliPayNumber) {
      //   error = '请填写支付宝账号';
    }

    if (error) {
      // Alert.alert('提示', error);
      Message.show(error);
    } else {
      this.props.actions.submitArtificerEdit({
        province: currentProvince,
        city: currentCity,
        country: currentDistrict,
        skilled_brands: Object.keys(skilledBrands).join(','),
        alipay_account: aliPayNumber,
        avatar_pic: avatarImg,
      });
    }
  }

  handleSelectBrand() {
    Actions.AutoBrandSelector();
  }

  handleSelectCity() {
    Actions.LocationSelector();
  }

  handlePressAlipay() {
    const { aliPayNumber } = this.props;

    Actions.AliPayNumberEdit({
      aliPayNumber,
      onFinish: this.props.actions.setAliPayNumber,
    });
  }

  render() {
    const currentUser = this.props.currentUser || {};
    const {
      artificerName,
      aliPayNumber,
      currentProvince,
      currentCity,
      currentDistrict,
      skilledBrands,
      avatarImg,
      avatarImgUri,
    } = this.props;
    // 擅长品牌
    const skilledBrandsText = Object.values(skilledBrands).join('、');

    // 所在城市
    const city = (currentCity === '市辖区' || currentCity === '县') ? '' : currentCity;
    const location = `${currentProvince}${city ? ' ' + city : ''}${currentDistrict ? ' ' +
      currentDistrict : ''}`;

    const titleConfig = {
      title: artificerName || '个人信息',
      tintColor: colors.navBarTextColor,
    };

    const leftBtn = {
      title: '返回',
      tintColor: '#fff',
      handler: this.handlePressBack,
      style: {
        paddingLeft: 5,
      },
    };

    const rightBtn = {
      title: '保存',
      tintColor: colors.navBarTextColor,
      handler: this.handlePressSubmit,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title={titleConfig} leftButton={leftBtn} rightButton={rightBtn}>

        <ScrollView style={styles.container}>

          <TouchableOpacity
            onPress={debounce(this.handlePressAvatar, 250, { leading: true, trailing: false })}
          >
            <View style={[peStyles.peItem, { height: 80 }]}>
              <Text style={[peStyles.peItemText, { flex: 1 }]} numberOfLines={1}>头像设置</Text>
              <AvatarUploader
                ref="avatarUploader"
                style={peStyles.peAvatar}
                sourcePlaceholder={images.im.defaultAvatar}
                imageName={avatarImg || currentUser.avatar_pic}
                imageUri={avatarImgUri}
                pickerOptions={AConfig.imageCropPickerOption.avatar}
                uploadFinish={this.avatarUploadFinish}
              />
              <Image source={images.icon.arrowRight} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={debounce(this.handleSelectBrand, 250, { leading: true, trailing: false })}
          >
            <View style={peStyles.peItem}>
              <Text style={peStyles.peItemText} numberOfLines={1}>擅长品牌</Text>
              <Text style={[peStyles.peItemText, peStyles.peItemData]} numberOfLines={1}>
                {skilledBrandsText || '暂无'}
              </Text>
              <Image source={images.icon.arrowRight} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={debounce(this.handleSelectCity, 250, { leading: true, trailing: false })}
          >
            <View style={peStyles.peItem}>
              <Text style={peStyles.peItemText} numberOfLines={1}>所在城市</Text>
              <Text style={[peStyles.peItemText, peStyles.peItemData]} numberOfLines={1}>
                {location || '未知'}
              </Text>
              <Image source={images.icon.arrowRight} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={debounce(this.handlePressAlipay, 250, { leading: true, trailing: false })}
          >
            <View style={[peStyles.peItem, { borderBottomWidth: 0 }]}>
              <Text style={peStyles.peItemText} numberOfLines={1}>支付宝账号</Text>
              <Text
                style={[
                  peStyles.peItemText,
                  peStyles.peItemData,
                  aliPayNumber ? null : styles.fgr,
                ]}
                numberOfLines={1}
              >
                {aliPayNumber || '输入支付宝信息'}
              </Text>
              <Image source={images.icon.arrowRight} />
            </View>
          </TouchableOpacity>
          {
            aliPayNumber ? (null) : (
              <View style={[peStyles.peTip, { borderTopWidth: 1, borderTopColor: '#e5e5e5' }]}>
                <Text style={[peStyles.peTipText]}>此支付宝账号用于提现您的答题收益</Text>
              </View>
            )
          }

        </ScrollView>

      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  const {
    isEdited,
    artificerName,
    aliPayNumber,
    currentProvince,
    currentCity,
    currentDistrict,
    skilledBrands,
    avatarImg,
    avatarImgUri,
  } = state.artificer;

  return {
    isEdited,
    currentUser,
    artificerName,
    aliPayNumber,
    currentProvince,
    currentCity,
    currentDistrict,
    skilledBrands,
    avatarImg,
    avatarImgUri,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setAvatarImg,
      resetArtificerInfo,
      submitArtificerEdit,
      setAliPayNumber,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
