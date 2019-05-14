import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Permissions from 'react-native-permissions';
import idcard from 'idcard';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import CredentialUploader from './CredentialUploader';
import Steps from '../../components/Steps/index';
import Message from '../../components/Message';

import styles from '../../styles';
import iStyles from './style/artificer_info';
import images from '../../images';

import { ArtificerInfoStepItems } from './constants';

import {
  setIdNumber,
  setWorkerCardImg,
  submitArtificerAudit,
} from '../../redux/user/actions';

class ArtificerInfoAuditEdit extends SafeComponent {
  constructor(props) {
    super(props);

    this.state = {
      imageInfo: null,
    };

    [
      'onPressBack',
      'onUploadFinish',
      'onIdNumberChange',
      'onSubmitAudit',
    ].map(method => this[method] = this[method].bind(this));
  }

  onPressBack() {
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

  onUploadFinish(imageInfo, imageKey, error) {
    if (error) {
      // Alert.alert('上传失败', `错误：${error}。请重新上传。`);
      Alert.alert('提示', error, [
        {
          text: '取消',
          style: 'cancel',
        }, {
          text: '设置',
          onPress: Permissions.openSettings,
        },
      ]);
      this.props.actions.setWorkerCardImg();
    } else if ((imageInfo && imageKey)) {
      this.props.actions.setWorkerCardImg(imageKey, imageInfo.imageUri);
    }
  }
  onIdNumberChange(value) {
    this.props.actions.setIdNumber(value.toLocaleUpperCase());
  }

  onSubmitAudit() {
    // 检查必填项
    const {
      artificerName,
      idNumber,
      workerCardImg,
    } = this.props;

    let error = '';
    if (!(idNumber)) {
      error = '请填写身份证号';
    } else if (!idcard.verify(idNumber)) {
      error = '身份证号码格式错误';
    } else if (!workerCardImg) {
      error = '请上传职业证明图片';
    }

    if (error) {
      // Alert.alert('提示', error);
      Message.show(error);
    } else {
      this.props.actions.submitArtificerAudit({
        name: artificerName,
        id_card_num: idNumber,
        business_card_pic: workerCardImg,
      }, Actions.ArtificerInfoAuditResult);
    }
  }

  render() {
    const currentUser = this.props.currentUser || {};
    const {
      artificerName,
      idNumber,
      workerCardImg,
      workerCardImgUri,
    } = this.props;

    const leftBtn = {
      title: '上一步',
      tintColor: '#fff',
      handler: this.onPressBack,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title="补全认证信息" leftButton={leftBtn}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* 步骤指示器 */}
            <Steps position={1} items={ArtificerInfoStepItems} />

            {
              currentUser.status === 2 ? (
                <View style={[iStyles.auditFailCell]}>
                  <View style={[iStyles.auditFail]}>
                    <Text style={iStyles.auditFailText}>
                      {`驳回原因：${currentUser.audit_fail_reason || '信息不符'}`}
                    </Text>
                  </View>
                </View>
              ) : (null)
            }

            <View style={[iStyles.basicCell]}>
              <Text style={iStyles.cellLabel}>姓名</Text>
              <Text style={[iStyles.cellInput]}>{artificerName}</Text>
            </View>
            <View style={[iStyles.basicCell]}>
              <Text style={iStyles.cellLabel}>身份证号</Text>
              <TextInput
                style={[iStyles.cellInput]}
                placeholder="请填写身份证号"
                underlineColorAndroid="transparent"
                value={idNumber}
                onChangeText={this.onIdNumberChange}
                returnKeyType="done"
                maxLength={18}
              />
            </View>

            <View style={[iStyles.workerCardCell, styles.mt10]}>
              <Text style={[iStyles.WCUploaderHeader, styles.mb5]}>上传职业身份证明</Text>
              <Text style={[iStyles.WCUploaderHeader, styles.mb10]}>工牌、资格证书等任一材料</Text>
              <CredentialUploader
                sourcePlaceholder={images.icon.idCard}
                isPrivate
                imageName={workerCardImg}
                imageUri={workerCardImgUri}
                uploadFinish={this.onUploadFinish}
                style={iStyles.WCUploader}
                imageStyle={iStyles.WCUploaderImage}
              />
            </View>

            <View style={iStyles.nextButtonContainer}>
              <TouchableOpacity
                style={iStyles.nextButton}
                onPress={this.onSubmitAudit}
              >
                <Text style={iStyles.nextButtonText}>提交审核</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  const {
    isEdited,
    artificerName,
    idNumber,
    workerCardImg,
    workerCardImgUri,
  } = state.artificer;
  return {
    isEdited,
    currentUser,
    artificerName,
    idNumber,
    workerCardImg,
    workerCardImgUri,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setIdNumber,
      setWorkerCardImg,
      submitArtificerAudit,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtificerInfoAuditEdit);
