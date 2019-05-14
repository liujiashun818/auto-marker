import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';

import style from '../../styles/index';
import styles from './style/SelectStyle';

import { getAllCarType } from '../../redux/plan/actions';

class SiftPrice extends Component {
  constructor() {
    super();
    this.state = {
      selectFirstId: 1,
      selectMonthId: 1,
      rentDownPayment: '',
      monthlyRent: '',
      firstPrice: [
        {
          index: 1,
          name: '全部',
          value: '0-1000000',
        },
        {
          index: 2,
          name: '一万以内',
          value: '0-10000',
        },
        {
          index: 3,
          name: '1-2万',
          value: '10000-20000',
        },
        {
          index: 4,
          name: '2-3万',
          value: '20000-30000',
        },
        {
          index: 5,
          name: '3-4万',
          value: '30000-40000',
        },
        {
          index: 6,
          name: '4-5万',
          value: '40000-50000',
        },
        {
          index: 7,
          name: '5万以上',
          value: '50000-1000000',
        },
      ],
      monthPrice: [
        {
          index: 1,
          name: '全部',
          value: '0-100000',
        },
        {
          index: 2,
          name: '一千以内',
          value: '0-1000',
        },
        {
          index: 3,
          name: '1-2千',
          value: '1000-2000',
        },
        {
          index: 4,
          name: '2-3千',
          value: '2000-3000',
        },
        {
          index: 5,
          name: '3-4千',
          value: '3000-4000',
        },
        {
          index: 6,
          name: '4-5千',
          value: '4000-5000',
        },
        {
          index: 7,
          name: '5千以上',
          value: '5000-100000',
        },
      ]
    };
  }

  onPrice(item) {
    this.setState({
      selectFirstId: item.index,
      rentDownPayment: item.value,
    });
  }

  onMonthPrice(item) {
    this.setState({
      selectMonthId: item.index,
      monthlyRent: item.value,
    });
  }

  showCarPlan() {
    const { rentDownPayment, monthlyRent } = this.state;
    this.props.actions.getAllCarType(rentDownPayment, monthlyRent);
    Actions.pop();
  }

  clearData() {
    this.setState({
      selectFirstId: 1,
      selectMonthId: 1,
    });
  }

  render() {
    const { selectFirstId, selectMonthId } = this.state;
    return (
      <BaseView title={'筛选'}>
        <View style={styles.firstView}>
          <Text style={[style.f14, style.fdf, style.ml15, style.mt20]}>首付</Text>
          <View style={styles.Tags}>
            {this.state.firstPrice.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  style={[
                    styles.tagLarge, style.mr10, style.mb10,
                    item.index === selectFirstId ? styles.ActiveBorder : styles.InactiveBorder,
                  ]}
                  onPress={this.onPrice.bind(this, item)}
                >
                  <Text
                    style={[style.f14, item.index === selectFirstId  ?
                      styles.selectColor : style.fdf]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View style={styles.listItemSeparator} />
        <View style={styles.firstView}>
          <Text style={[style.f14, style.fdf, style.ml15, style.mt20]}>月租</Text>
          <View style={styles.Tags}>
            {this.state.monthPrice.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={[
                  styles.tagLarge, style.mr10, style.mb10,
                  item.index === selectMonthId ? styles.ActiveBorder : styles.InactiveBorder,
                ]}
                onPress={this.onMonthPrice.bind(this, item)}
              >
                <Text
                  style={[style.f14, item.index === selectMonthId  ?
                    styles.selectColor : style.fdf]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.bottomAction]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[style.flexRowCenter,styles.btnOne]}
            onPress={this.clearData.bind(this)}
          >
            <Text>重置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[style.flexRowCenter, styles.btnBlock]}
            onPress={this.showCarPlan.bind(this)}
          >
            <Text>查看方案</Text>
          </TouchableOpacity>
        </View>
      </BaseView>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getAllCarType }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiftPrice);
