import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';

import ConditionSelector from './ConditionSelector';

import style from '../../styles/index';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  module: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  moduleHeader: {
    height: 50,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  moduleBody: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleBodyImg: {
    width: 140,
    height: 80,
  },

  moduleBodyRight: {
    flexDirection: 'column',
  },
  moduleBodyTitle: {
    flex: 1,
    flexWrap: 'nowrap',
    marginBottom: 8,
  },
  moduleBodyTitleText: {
    fontSize: 16,
  },

});

/**
 * 订单列表
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderRow = this.renderRow.bind(this);
  }

  keyExtractor(rowData) {
    return rowData._id;
  }

  calculateStatusStyle(status) {
    switch (status) {
      case 1:
        return style.textOrange;
      case 2:
        return style.textRed;
      default:
        return style.textDefault;
    }
  }

  renderRow(rowData) {
    const { item, index } = rowData;
    return (
      <TouchableOpacity
        style={[styles.module, style.mb15, index === 0 ? style.mt15 : null]}
        onPress={() => Actions.OrderDetail({ id: item._id })}
        activeOpacity={0.618}
      >
        <View style={styles.moduleHeader}>
          <Text>
            <Text style={style.mr5}>{item.name}</Text>
            <Text>{item.phone}</Text>
          </Text>

          <Text style={[this.calculateStatusStyle(item.status)]}>{item.status_name}</Text>
        </View>

        <View style={styles.moduleBody}>
          <Image style={styles.moduleBodyImg} source={require('../../images/auto.png')} />

          <View style={styles.moduleBodyRight}>
            <View style={[style.label, style.labelPrimary, style.mb10]}>
              <Text style={style.labelPrimaryText}>车型方案</Text>
            </View>
            <View style={styles.moduleBodyTitle}>
              <Text style={styles.moduleBodyTitleText}>
                {`${item.brand_name} ${item.year} ${item.series_name} ${item.type_name}`}
              </Text>
            </View>
            <Text style={style.mb10}>
              首付 <Text style={style.textOrange}>{item.first_pay}</Text>
              月租 <Text style={style.textOrange}>{item.month_pay}</Text>
            </Text>
            <Text style={style.textGray}>创建时间：{item.ctime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const orders = [
      {
        _id: '22221',
        name: '王艺雪',
        phone: 15210826716,
        type: 'intention',
        brand_name: '大众',
        series_name: '朗逸',
        type_name: '经典款 1.6L 手自一体',
        year: '2014款',
        guide_price: 153000,
        first_pay: 12000,
        month_pay: 1999,
        ctime: '2017-09-08 12:23:33',
        status: 1,
        status_name: '签单',
      }, {
        _id: '2233221',
        name: '徐哲',
        phone: 15210826716,
        type: 'intention',
        brand_name: '宝马',
        series_name: '朗逸',
        type_name: '经典款 1.6L 手自一体',
        year: '2015款',
        guide_price: 353000,
        first_pay: 22000,
        month_pay: 3299,
        ctime: '2017-09-08 12:23:33',
        status: 2,
        status_name: '交易终止',
      }];

    return (
      <BaseView title="订单列表" leftButton={null}>
        <ConditionSelector />

        <FlatList
          data={orders}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
