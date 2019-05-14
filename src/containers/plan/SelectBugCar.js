import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';


import BaseView from '../../components/BaseView';

import style from '../../styles/index';
import colors from '../../styles/colors';
import images from '../../images/index';

/**
 * 选择购买方案
 */
const styles = StyleSheet.create({
  priceView: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 0,
  },
  list: {
    backgroundColor: '#fff',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  image: {
    width: 120,
    height: 80,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  carName: {
    flexWrap: 'wrap',
    width: 180,
    fontSize: 18,
    fontWeight: '600',
  },
});

class SelectBugCar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toFinanceDetail() {
    Actions.FinancePlan();
  }

  toCarTypeDetail() {
    Actions.CarTypePlan();
  }

  renderCarType() {
    var result = [];
    result.push(
      <TouchableOpacity
        key={1}
        activeOpacity={1}
        style={[styles.list, style.p15]}
        onPress={this.toCarTypeDetail.bind(this)}
      >
        <Text style={[style.fdf, style.pl15]}>开走吧-保证金客户</Text>
        <View style={style.flexRowBetween}>
          <View>
            <View style={styles.priceView}>
              <View>
                <Text style={[style.textGray, style.mb5]}>首付</Text>
                <Text style={[style.f20, style.textOrange]}>1000元</Text>
              </View>
              <View style={style.ml20}>
                <Text  style={[style.textGray, style.mb5]}>首付</Text>
                <Text style={[style.f20, style.textOrange]}>1000元</Text>
              </View>
            </View>
            <View style={style.p15}>
              <Text style={style.textGray}>推荐理由：首付低，月供低，新车含购置税和保险</Text>
              <Text style={style.textGray}>注意事项：公司户</Text>
            </View>
          </View>
          <Image source={images.icon.arrowRight} />
        </View>
      </TouchableOpacity>,
    );
    return result;

  }

  renderCarFinance() {
    var result = [];
    result.push(
      <TouchableOpacity
        key={1}
        activeOpacity={1}
        style={[styles.list, style.p10, style.flexRowBetween]}
        onPress={this.toFinanceDetail.bind(this)}
      >
        <View style={[style.p15]}>
          <Text style={style.mb10}>金融车贷</Text>
          <Text style={[style.mb10, style.textGray]}>36期/48期</Text>
          <Text style={style.textGray}>推荐理由：首付低，月供低，新车含购置税和保险</Text>
        </View>
        <Image source={images.icon.arrowRight} />
      </TouchableOpacity>
    )
    return result;
  }

  render() {
    return (
      <BaseView title="选择购买方案">
        <ScrollView>
          <View style={[style.flexRowBetween, style.p10, { backgroundColor: '#ff1f' }]}>
            <View style={style.flexBase}>
              <Image source={require('../../images/auto.png')} style={styles.image} />
              <View style={style.ml10}>
                <Text style={[style.mt5, styles.carName]}>朗逸 2013款 经典款1.6L 手自一体</Text>
                <Text style={[style.mt5, style.textGray]}>
                  指导价: <Text style={style.textDefault}>100000万</Text>
                </Text>
              </View>
            </View>
            <Image source={images.icon.arrowRight} style={styles.images}/>
          </View>
          <View>
            <Text style={[style.m10, style.fgr]}>车型方案</Text>
            {this.renderCarType()}
          </View>
          <View>
            <Text style={[style.m10, style.fgr]}>车型方案</Text>
            {this.renderCarFinance()}
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectBugCar);
