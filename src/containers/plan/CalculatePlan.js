import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView';
import ActionSheet from '../../components/ActionSheet/ModalActionSheet';
import Button from '../../components/Button';

import style from '../../styles/index';
import images from '../../images/index';
import colors from '../../styles/colors';
import { ScreenWidth, StatusBarHeight, NavBarHeight, ScreenHeight } from '../../styles/sizes';

/**
 * 计算方案
 */
const styles = StyleSheet.create({
  rowList: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    height: 50,
    width: 100,
    fontSize: 16,
  },
  sSubmit: {
    flex: 0,
    height: 50,
    width: ScreenWidth * 0.8,
    alignSelf: 'center',
    marginTop: 20,
  },
  smallText: {
    flex: 0,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  modal: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? (StatusBarHeight + NavBarHeight) : NavBarHeight,
    backgroundColor: 'rgba(127, 127, 127, .7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 10,
    marginHorizontal: (ScreenWidth - 330) / 2,
    marginTop: 180,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 25,
  },
  selectView: {
    height: 50,
    width: 140,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CalculatePlan extends SafeComponent {
  constructor(props) {
    super(props);
    this.state = {
      bankValue: true,
      bankFlow: true,
      homeCertificate: true,
      liveCertificate: true,
      creditModalVisible: false,
      creditRecord: '信用优秀',
      visible: false,
      openingPrice: 0,
    };
    this.creditItem = [
      {
        title: '信用优秀',
        handler: this.selectCredit.bind(this, 1, '信用优秀'),
      },
      {
        title: '信用良好',
        handler: this.selectCredit.bind(this, 2, '信用良好'),
      },
      {
        title: '信用较差',
        handler: this.selectCredit.bind(this, 3, '信用较差'),
      },
      {
        title: '信用很差',
        handler: this.selectCredit.bind(this, 4, '信用很差'),
      },
      {
        title: '信用白户',
        handler: this.selectCredit.bind(this, 5, '信用白户'),
      },
    ];
    this.hideModal = this.hideModal.bind(this);
  }

  selcetCar() {
    Actions.AutoSelectBrand();
  }

  selectCredit(type, value) {
    this.setState({
      creditRecord: value,
    });
    this.onCancelCredit();
  }

  onCancelCredit() {
    this.setState({
      creditModalVisible: !this.state.creditModalVisible,
    });
  }

  creatNewPlan() {
    Actions.SelectBugCar();
  }

  changeOpeningPrice(price) {
    this.safeSetState({
      openingPrice: price,
    });
  }

  hideModal() {
  this.safeSetState({
    visible: !this.state.visible,
  })
}

  render() {
    return (
      <BaseView title="计算方案">
        <ScrollView keyboardDismissMode="on-drag" style={{ backgroundColor: '#fff', height: ScreenHeight }}>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>选择车型</Text>
            </View>
            <TouchableOpacity style={styles.selectView} onPress={this.selcetCar.bind(this)}>
              <Text>车型</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>指导价</Text>
            </View>
            <Text>10000元</Text>
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>估价</Text>
            </View>
            <View style={styles.textView}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.textInput}
                placeholder="请输入估价"
                keyboardType="numeric"
                placeholderTextColor="#ccc"
                onChangeText={this.changeOpeningPrice.bind(this)}
              />
              <Text>元</Text>
            </View>
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>信用卡/房贷/车贷/银行贷款</Text>
            </View>
            <Switch
              onValueChange={(value) => this.setState({bankValue: value})}
              onTintColor={'#2B94FF'}
              value={this.state.bankValue}
            />
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>信用记录</Text>
            </View>
            <TouchableOpacity style={styles.selectView} onPress={this.onCancelCredit.bind(this)}>
              <Text>{this.state.creditRecord}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>银行流水</Text>
            </View>
            <Switch
              onValueChange={(value) => this.setState({bankFlow: value})}
              onTintColor={'#2B94FF'}
              value={this.state.bankFlow}
            />
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>房产证</Text>
            </View>
            <Switch
              onValueChange={(value) => this.setState({homeCertificate: value})}
              onTintColor={'#2B94FF'}
              value={this.state.homeCertificate}
            />
          </View>
          <View style={styles.rowList}>
            <View style={style.flexRowCenter}>
              <Text>Image</Text>
              <Text>居住证</Text>
            </View>
            <Switch
              onValueChange={(value) => this.setState({liveCertificate: value})}
              onTintColor={'#2B94FF'}
              value={this.state.liveCertificate}
            />
          </View>
          <Button
            buttonStyle={[style.btn, style.btnPrimary, styles.sSubmit]}
            textStyle={[style.btnPrimaryText]}
            onPress={this.creatNewPlan.bind(this)}
            title="生成方案"
          />
          <View style={styles.smallText}>
            <Text>若职位为公务员/教师/医生，则默认有银行流水</Text>
          </View>
        </ScrollView>

        <ActionSheet
          visible={this.state.creditModalVisible}
          strict
          autoClose={false}
          title="信用记录"
          onCancel={this.onCancelCredit.bind(this)}
          actionItems={this.creditItem}
        />
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.visible}
          onRequestClose={this.hideModal}
        >
          <View style={[styles.modal]}>
            <View style={styles.modalContent}>
              <Text style={style.mb5}>信用优秀:极少逾期且很快结清</Text>
              <Text style={style.mb5}>信用良好:逾期较多较长，但未成黑户，现已结清</Text>
              <Text style={style.mb5}>信用较差:非恶意黑户（逾期20个工作日以上）</Text>
              <Text style={style.mb5}>信用很差:法院或公安系统执行，尚未结案</Text>
              <Text>征信白户:无征信记录</Text>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={this.hideModal}>
              <Image style={styles.closeBtn} source={images.icon.close} />
            </TouchableOpacity>
          </View>
        </Modal>

      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculatePlan);
