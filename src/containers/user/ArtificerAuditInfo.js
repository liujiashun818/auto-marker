import { connect } from 'react-redux';

import React from 'react';
import { Alert, ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { ActionConst, Actions } from 'react-native-router-flux';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import CredentialUploader from './CredentialUploader';

import styles from '../../styles';
import iStyles from './style/artificer_info';
import images from '../../images';

class ArtificerAuditInfo extends SafeComponent {
  constructor(props) {
    super(props);

    [
      'onPressBack',
      'onPressEditAudit',
    ].map(method => this[method] = this[method].bind(this));
  }

  onPressBack() {
    Actions.pop();
  }

  onPressEditAudit() {
    Alert.alert(
      '提示',
      '修改信息需要重新提交审核，是否确定修改？',
      [
        { text: '取消' },
        {
          text: '确定',
          onPress: () => { Actions.ArtificerInfoBasicEdit({ type: ActionConst.REPLACE }); },
        },
      ],
    );
  }

  render() {
    const currentUser = this.props.currentUser || {};

    const city = (currentUser.city === '市辖区' || currentUser.city === '县') ? '' : currentUser.city;
    const location = `${currentUser.province}${city ? ` ${city}` : ''}${
      currentUser.country ? ` ${currentUser.country}` : ''}`;

    const leftBtn = {
      title: '返回',
      tintColor: '#fff',
      handler: this.onPressBack,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView
        title="认证信息详情"
        leftButton={this.props.type === ActionConst.PUSH ? leftBtn : null}
      >

        <ScrollView style={styles.container}>

          <View style={[iStyles.basicCell]}>
            <Text style={iStyles.cellLabel}>姓名</Text>
            <Text style={iStyles.cellContextLeft}>{currentUser.name}</Text>
          </View>
          <View style={[iStyles.basicCell]}>
            <Text style={iStyles.cellLabel}>身份证号</Text>
            <Text style={iStyles.cellContextLeft}>{currentUser.id_card_num}</Text>
          </View>

          <View style={[iStyles.basicCell, styles.mt10]}>
            <Text style={iStyles.cellLabel}>所在城市</Text>
            <Text style={iStyles.cellContext}>{location}</Text>
          </View>
          <View style={[iStyles.basicCell]}>
            <Text style={iStyles.cellLabel}>入行时间</Text>
            <Text style={iStyles.cellContext}>{currentUser.started_work_time}</Text>
          </View>
          <View style={[iStyles.basicCell]}>
            <Text style={iStyles.cellLabel}>擅长品牌</Text>
            <Text style={iStyles.cellContext}>{currentUser.skilled_brand_names}</Text>
          </View>

          <View style={[iStyles.AIWorkerCardCell, styles.mt10]}>
            <Text style={[iStyles.WCUploaderLabel, styles.mb15]}>职业证明材料</Text>
            <CredentialUploader
              sourcePlaceholder={images.icon.idCard}
              isPrivate
              imageName={currentUser.business_card_pic}
              disabled
              style={iStyles.WCUploader}
              imageStyle={iStyles.WCUploaderImage}
            />
          </View>

          <View style={iStyles.nextButtonContainer}>
            <TouchableOpacity style={iStyles.nextButton} onPress={this.onPressEditAudit}>
              <Text style={iStyles.nextButtonText}>修改审核信息</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  return { currentUser };
}

export default connect(mapStateToProps, null)(ArtificerAuditInfo);
