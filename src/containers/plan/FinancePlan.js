import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';

import ViewShot from 'react-native-view-shot';

import BaseView from '../../components/BaseView';
import ActionSheet from '../../components/ActionSheet/ModalActionSheet';
import Button from '../../components/Button';
import ShareModal from '../../components/ShareModal/index';

import style from '../../styles/index';
import styles from './style/PlanDetailStyle';
import images from '../../images/index';
/**
 * 金融方案详情
 */

class FinancePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadIndex: 1,
      loadPeriod: 36,
      visible: false,
      screenUri: '',
    };
    this.loadPeriodItem = [
      {
        index: 1,
        value: 36,
      },
      {
        index: 2,
        value: 48,
      },
    ];
    this.hideModal = this.hideModal.bind(this);
  }

  // 金磁计算器
  // carValueCirculate() {
  //   var openingPrice = 0;
  //   var introducePrice = 0;
  //   var downPayPrice = 0;
  //   var loanPrice = 0;
  //   var Monthgongjine = 0;
  //   var purchaseTax = 0;
  //   var insuranceFee = 0;
  //   var MonthSelfValue = 0;
  //   var downPayRatio = 0;
  //   var downPayRatioOne = 0;
  //   var downPayRatioTwo = 0;
  //   var FirstPayAddNum = 0;
  //   var carFinanceValue = 0;
  //   if (openingPrice <= 100000) {
  //     insuranceFee = 5000;
  //   } else if (100000 < openingPrice <= 150000) {
  //     insuranceFee = 6600;
  //   } else if (150000 < openingPrice <= 200000) {
  //     insuranceFee = 7600;
  //   } else if (200000 < openingPrice <= 250000) {
  //     insuranceFee = 8600;
  //   } else if (250000 < openingPrice <= 300000) {
  //     insuranceFee = 9600;
  //   } else if (300000 < openingPrice <= 350000) {
  //     insuranceFee = 11000;
  //   }
  //   FirstPayAddNum = openingPrice <= 200000 ? 0 : 0.05;
  //   if (output <= 1.6) {
  //     downPayRatioOne = 0.13;
  //     purchaseTax = introducePrice/8.8;
  //   } else {
  //     downPayRatioOne = 0.15;
  //     purchaseTax = introducePrice/11.7;
  //   }
  //   if (instalments == 36) {
  //     downPayRatioTwo = 0;
  //   } else {
  //     downPayRatioTwo = 0.15;
  //   }
  //   if (downPayRatioTwo >= downPayRatioOne) {
  //     downPayRatio = downPayRatioTwo;
  //   } else {
  //     downPayRatio = downPayRatioOne;
  //   }
  //   downPayPrice = openingPrice * (downPayRatio+FirstPayAddNum) + '经销商提车费' + '平台服务费';
  //   carFinanceValue = openingPrice * (1 - FirstPayAddNum);
  //   loanPrice = purchaseTax + insuranceFee + 3000 + carFinanceValue;
  //   Monthgongjine = (loanPrice * 0.0042 * loadPeriod) / loadPeriod;
  //   MonthSelfValue = carFinanceValue / loadPeriod;
  //   MonthRent = Monthgongjine - MonthSelfValue;
  //
  // }
  //易鑫计算器
  // highCustomerFirstCirculate() {
  //   var openingPrice = 0;
  //   var introducePrice = 0;
  //   var downPayPrice = 0;
  //   var loanPrice = 0;
  //   var remainingloanPrice = 0;
  //   var remainingValuePrice = 0;
  //   var firstYearMonthRent = 0;
  //   var remainingMonthRent = 0;
  //   var purchaseTax = 0;
  //   var insuranceFee = 0;
  //   var FirstPay = 0;
  //   var remainSelfValue = 0;
  //   var remainMonthRent = 0;
  //   var ensureMoney = introducePrice * 0.1;
  //   if (openingPrice <= 100000) {
  //     insuranceFee = 5000;
  //   } else if (100000 < openingPrice <= 150000) {
  //     insuranceFee = 6000;
  //   } else if (150000 < openingPrice <= 200000) {
  //     insuranceFee = 7100;
  //   } else if (200000 < openingPrice <= 250000) {
  //     insuranceFee = 8100;
  //   } else if (250000 < openingPrice <= 300000) {
  //     insuranceFee = 9100;
  //   } else if (300000 < openingPrice <= 350000) {
  //     insuranceFee = 10500;
  //   } else if (350000 < openingPrice <= 400000) {
  //     insuranceFee = 11500;
  //   } else if (400000 < openingPrice <= 450000) {
  //     insuranceFee = 12600;
  //   } else if (450000 < openingPrice <= 500000) {
  //     insuranceFee = 13600;
  //   } else if (500000 < openingPrice <= 600000) {
  //     insuranceFee = 15800;
  //   } else {
  //     insuranceFee = 17900;
  //   }
  //   downPayPrice = ensureMoney + '服务费' + '提车费';
  //   remainingValuePrice = openingPrice * 0.85;
  //   purchaseTax = output < = 1.6 ? introducePrice/8.8 : introducePrice/11.7;
  //   loanPrice = openingPrice + insuranceFee + purchaseTax + 550 - introducePrice*0.1;
  //   firstYearMonthRent = loanPrice * [(1.1 * (Math.pow(2.1, 12)))/(Math.pow(2.1, 12)) - 1];
  //   FirstPay = downPayPrice + firstYearMonthRent;
  //   remainingloanPrice = remainingValuePrice + 410;
  //   remainingMonthRent = remainingloanPrice * [(0.9 * (Math.pow(1.9, loadPeriod)))/(Math.pow(1.9, loadPeriod)) - 1];
  //   // remainSelfValue = remainingloanPrice / loadPeriod;
  //   // remainMonthRent = remainingMonthRent - remainSelfValue;
  // }

  createWill() {
  }

  sendCustomer() {
    this.viewShot.capture().then((screenUri) => {
      this.setState({ screenUri });
    });
    this.ShareModal.showSelect();
  }

  loadPeriod(item) {
    this.setState({
      loadIndex: item.index,
      loadPeriod: item.value,
    });
  }

  hideModal() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  changeOpeningPrice() {
  }

  reviseOpenPrice() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { loadIndex } = this.state;
    return (
      <BaseView
        title="金融车贷"
        rightButton={
        <TouchableOpacity
          activeOpacity={1}
          style={styles.btnNavRight}
          onPress={this.hideModal}
        >
          <Text>编辑</Text>
        </TouchableOpacity>
      }>
        <ScrollView style={[style.container, { marginBottom: 50 }]}>
          <ViewShot ref={(self) => { this.viewShot = self; }} options={{ format: 'jpg', quality: 0.9 }}>
          <View>
            <Image source={require('../../images/auto.png')} style={styles.carImage} />
            <View style={[style.p15, styles.bgWhite]}>
              <Text>日产大好时光客户</Text>
              <Text style={[style.mt10]}>指导价: 2541元</Text>
            </View>
          </View>
          <View style={[style.flexRow, style.p15, styles.bgWhite, styles.borderTop]}>
            <Text>外观/内饰</Text>
            <View style={styles.Direction}>
              <Text style={style.mr5}>黑/白</Text>
              <Image source={images.icon.arrowRight} />
            </View>
          </View>
          <View style={[style.flexRowBetween, styles.lineRow, styles.bgWhite]}>
            <Text>分期</Text>
            <View style={styles.Direction}>
              {
                this.loadPeriodItem.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    style={[
                      styles.button,
                      item.index === loadIndex ? styles.ActiveBorder : styles.InactiveBorder,
                    ]}
                    onPress={this.loadPeriod.bind(this, item)}
                  >
                    <Text
                      style={
                        item.index === loadIndex ? styles.selectColor : styles.blueColor}
                    >
                      {`${item.value}期`}
                    </Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
          {/*易鑫*/}
          {
            <View style={[style.module, style.mt15]}>
              <View style={styles.priceDetail}>
                <View style={styles.detailView}>
                  <Text>首付</Text>
                  <Text style={style.textOrange}>10000元</Text>
                </View>
                <View style={styles.detailView}>
                  <Text>月租</Text>
                  <Text style={style.textOrange}>10000元</Text>
                </View>
                <View style={styles.detailView}>
                  <Text>保证金</Text>
                  <Text style={style.textOrange}>10000元</Text>
                </View>
                <View style={styles.detailView}>
                  <Text>服务费</Text>
                  <Text style={style.textOrange}>10000元</Text>
                </View>
              </View>
              <View style={[style.p15, style.flexRowCenter, styles.bgWhite]}>
                <Text>首次支出共计<Text style={style.textOrange}>260000</Text>元</Text>
              </View>
            </View>
          }
          {/*金磁*/}
          {
            <View style={[style.module, style.mt15]}>
              <View style={styles.priceDetail}>
                <View style={styles.detailView}>
                  <Text>首付</Text>
                  <Text style={style.textOrange}>10000元</Text>
                </View>
                <View style={styles.detailView}>
                  <Text>月租</Text>
                  <Text style={style.textOrange}>10000元</Text>
                </View>
              </View>
            </View>
          }
          <View style={[style.module, style.mt15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>产品详情</Text>
            </View>

            <View style={style.moduleContent}>
              <Text>赠送焦点四大金刚</Text>
            </View>
          </View>
          <View style={[style.module, style.mt15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>申请流程</Text>
            </View>

            <View style={style.moduleContent}>
              <Text>赠送焦点四大金刚</Text>
            </View>
          </View>
          </ViewShot>
        </ScrollView>
        <View style={[styles.bottomAction]}>
          <View style={styles.bottomActionPrice}>
            <Text>
              首次支出
            </Text>
            <Text>
              123456元
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={[style.flexRowCenter, styles.btnBlock]}
            onPress={this.sendCustomer.bind(this)}
          >
            <Text>发给客户</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[style.flexRowCenter, styles.btnBlock]}
            onPress={this.createWill.bind(this)}
          >
            <Text>生成意向</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.visible}
          onRequestClose={this.hideModal}
        >
          <View style={[styles.modal]}>
            <View style={styles.modalContent}>
              <View style={[styles.modalTitle]}>
                <Text>修改估价</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.close}
                  onPress={this.hideModal}
                >
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ModalInput}>
                  <View style={styles.moneyStyle}><Text style={styles.f18}>￥</Text></View>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'请输入估价'}
                    onChangeText={this.changeOpeningPrice}
                  />
              </View>
              <Button
                buttonStyle={[style.btn, style.btnPrimary, styles.Submit]}
                textStyle={[styles.btnPrimaryText]}
                onPress={this.reviseOpenPrice.bind(this)}
                title="确定"
              />
            </View>
          </View>
        </Modal>

        <ShareModal
          ref={(self) => { this.ShareModal = self; }}
          Imagedata={this.state.screenUri}
        />

        <ActionSheet
        // visible={this.state.colorModalVisible}
        // strict
        // autoClose={false}
        // title="外观/内饰"
        // onCancel={this.onCancelColors.bind(this)}
        // actionItems={this.colorsItem}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(FinancePlan);
