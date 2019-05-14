import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import ViewShot from 'react-native-view-shot';

import BaseView from '../../components/BaseView';
import ActionSheet from '../../components/ActionSheet/ModalActionSheet';
import ShareModal from '../../components/ShareModal/index';
import message from '../../components/Message/index';

import style from '../../styles/index';
import styles from './style/PlanDetailStyle';
import images from '../../images/index';

/**
 * 车型详情
 */

class CarTypePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorModalVisible: false,
      loadIndex: 1,
      loadPeriod: 12,
      visible: false,
      screenUri: '',
    };
    this.loadPeriodItem = [
      {
        index: 1,
        value: 12,
      },
      {
        index: 2,
        value: 24,
      },
      {
        index: 3,
        value: 36,
      },
    ];
    this.colorsItem = [
      {
        title: '信用优秀',
        handler: this.onCancelColors.bind(this, '1'),
      },
      {
        title: '信用良好',
        handler: this.onCancelColors.bind(this, '2'),
      },
    ];
    this.hideModal = this.hideModal.bind(this)
  }

  createWill() {

  }

  hideModal() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  reviseOpenPrice() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  loadPeriod(item) {
    this.setState({
      loadIndex: item.index,
      loadPeriod: item.value,
    });
  }

  onCancelColors() {
    this.setState({
      colorModalVisible: !this.state.colorModalVisible,
    });
  }

  sendCustomer() {
    this.viewShot.capture().then((screenUri) => {
      this.setState({ screenUri });
    });
    this.ShareModal.showSelect();
  }

  render() {
    const { loadIndex } = this.state;
    return (
      <BaseView title="开走吧-车型方案">
        <ScrollView style={[style.container, { marginBottom: 50 }]}>
          <ViewShot ref={(self) => { this.viewShot = self; }} options={{ format: 'jpg', quality: 0.9 }}>
          <View>
            <Image source={require('../../images/auto.png')} style={styles.carImage} />
            <View style={[style.p15, styles.bgWhite]}>
              <Text>日产大好时光客户</Text>
              <Text style={[style.mt10]}>指导价： 2541元</Text>
            </View>
          </View>
          <View style={[style.flexRow, style.p15, styles.bgWhite, styles.borderTop]}>
            <Text>外观/内饰</Text>
            <View style={styles.Direction}>
              <Text style={style.mr5}>黑/白</Text>
              <Image source={images.icon.arrowRight} />
            </View>
          </View>
          <View style={[style.module, style.mt15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>1+X</Text>
            </View>

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
              <Text>首次支出共计<Text style={style.textOrange}>800000</Text>元</Text>
            </View>
          </View>
          <View style={[style.module, style.mt15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>分期买车/残值买断</Text>
            </View>

            <View style={style.moduleContent}>
              <View style={[style.flexRowBetween, styles.lineRow]}>
                <Text>残值</Text>
                <Text style={style.textOrange}>800000元</Text>
              </View>
              <View style={[style.flexRowBetween, styles.lineRow]}>
                <Text>分期</Text>
                <View style={styles.Direction}>
                  {
                    this.loadPeriodItem.map((item, index)  => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        style={[
                          styles.button,
                          item.index === loadIndex ? styles.ActiveBorder : styles.InactiveBorder
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
              <View style={[style.flexRowBetween, styles.lineRow]}>
                <Text>月供</Text>
                <Text style={style.textOrange}>800000元</Text>
              </View>
            </View>
          </View>
          <View style={[style.module, style.mt15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>可选套餐</Text>
            </View>

            <View style={style.moduleContent}>
             <Text>赠送焦点四大金刚</Text>
            </View>
          </View>
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
          <TouchableOpacity
            activeOpacity={1}
            style={[style.flexRowCenter, { flex: 0.3 }]}
            onPress={this.sendCustomer.bind(this)}
          >
            <Text>发给客户</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[style.flexRowCenter, styles.btnBlock, { flex: 0.7 }]}
            onPress={this.createWill.bind(this)}
          >
            <Text>生成意向</Text>
          </TouchableOpacity>
        </View>

        <ActionSheet
          visible={this.state.colorModalVisible}
          strict
          autoClose={false}
          title="外观/内饰"
          onCancel={this.onCancelColors.bind(this)}
          actionItems={this.colorsItem}
        />

        <ShareModal
          ref={(self) => { this.ShareModal = self; }}
          Imagedata={this.state.screenUri}
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

export default connect(mapStateToProps, mapDispatchToProps)(CarTypePlan);
