import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import Steps from '../../components/Steps/index';

import styles from '../../styles';
import iStyles from './style/artificer_info';
import images from '../../images';

import { ArtificerInfoStepItems } from './constants';

const auditStatusConfig = {
  0: {
    description: '您的审核已提交，请等待审核',
    image: images.icon.iconVerifyProcess,
  },
  1: {
    description: '您的审核已通过，去回答问题吧～',
    image: images.icon.iconVerifySucceed,
  },
  2: {
    description: '信息不符',
    image: images.icon.iconVerifyFail,
  },
  3: {
    description: '您的审核已提交，请等待审核',
    image: images.icon.iconVerifyProcess,
  },
};

// 返回主页按钮
const btnGoHome = (
  <TouchableOpacity
    key="btnGoHome"
    style={[iStyles.nextButton, styles.mh5]}
    onPress={() => {
      Actions.TabBar();
      Actions.Questions();
    }}
  >
    <Text style={iStyles.nextButtonText}>返回主页</Text>
  </TouchableOpacity>
);
// 重新审核按钮
const btnReaudit = (
  <TouchableOpacity
    key="btnReaudit"
    style={[iStyles.nextButton, styles.mh10]}
    onPress={() => {
      Actions.ArtificerInfoBasicEdit({ type: ActionConst.REPLACE });
    }}
  >
    <Text style={iStyles.nextButtonText}>重新审核</Text>
  </TouchableOpacity>
);
// 完善个人信息按钮
const btnArtificerEdit = (
  <TouchableOpacity
    key="btnArtificerEdit"
    style={[iStyles.nextButton, styles.mh10]}
    onPress={() => {
      Actions.ProfileEdit({ type: ActionConst.REPLACE });
    }}
  >
    <Text style={iStyles.nextButtonText}>完善个人信息</Text>
  </TouchableOpacity>
);
// 去回答问题按钮
const btnAnswerQuestions = (
  <TouchableOpacity
    key="btnAnswerQuestions"
    style={[iStyles.nextButton, styles.mh10]}
    onPress={() => {
      Actions.TabBar();
      Actions.Questions();
    }}
  >
    <Text style={iStyles.nextButtonText}>先去回答问题</Text>
  </TouchableOpacity>
);
// 结果按钮配置
const auditButtonConfig = {
  0: [btnGoHome],
  1: [btnArtificerEdit, btnAnswerQuestions],
  2: [btnReaudit],
  3: [btnGoHome],
};

class ArtificerInfoAuditResult extends SafeComponent {
  constructor(props) {
    super(props);

    [
      'onPressBack',
    ].map(method => this[method] = this[method].bind(this));
  }

  onPressBack() {
    Actions.TabBar();
    Actions.Profile();
  }

  render() {
    const currentUser = this.props.currentUser || {};
    const auditStatusObj = auditStatusConfig[currentUser.status] || {};
    const auditStatusImage = auditStatusObj.image;
    const auditStatusName = currentUser.status_name;
    const auditStatusDescription = currentUser.status !== 2
      ? auditStatusObj.description
      : `驳回原因：${currentUser.audit_fail_reason || '信息不符'}`;
    const buttons = auditButtonConfig[currentUser.status] || [];

    const leftBtn = {
      title: '返回',
      tintColor: '#fff',
      handler: this.onPressBack,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title="补全认证信息" leftButton={leftBtn}>

        <View style={styles.container}>
          {/* 步骤指示器 */}
          <Steps position={2} items={ArtificerInfoStepItems} />

          <View style={[iStyles.auditResultCell, styles.mt20]}>
            <Image source={auditStatusImage} style={[iStyles.auditResultImage]} />
            <Text style={[iStyles.auditResultTitle, styles.mt25]}>
              {auditStatusName}
            </Text>
            <Text style={[iStyles.auditResultSubtitle, styles.mt15]}>
              {auditStatusDescription}
            </Text>
          </View>

          <View style={iStyles.nextButtonContainer}>
            {buttons}
          </View>
        </View>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  return { currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtificerInfoAuditResult);
