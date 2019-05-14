import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';
import images from '../../images';

import style from '../../styles/index';
import colors from '../../styles/colors';

import { ScreenWidth } from '../../styles/sizes';

import { getAllCarType } from '../../redux/plan/actions';

/**
 * 车型方案列表
 */
const styles = StyleSheet.create({
  topItem: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  item: {
    width: (ScreenWidth / 2) - 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
  },
  flatList: {
    paddingTop: 10,
  },
  image: {
    marginTop: 5,
    marginLeft: 10,
  },
  carImage: {
    width: 120,
    height: 70,
  },
  list: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  priceDetail: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    flexWrap: 'wrap',
    flex: 7,
  },
  customerType: {
    width: 40,
    backgroundColor: colors.yellow,
    borderRadius: 4,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  carType: {
    fontSize: 16,
    fontWeight: '600',
  },
});

class CarTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.refreshingData();
  }

  refreshingData() {
    this.props.actions.getAllCarType();
  };

  toSelectPrice() {
    Actions.SiftPrice();
  }

  selcetCar() {
    Actions.AutoSelectBrand();
  }

  keyExtractor(rowData) {
    return rowData._id;
  }

  renderRow(rowData) {
    const { item } = rowData;
    return(
      <TouchableOpacity
        activeOpacity={1}
        style={[style.p15,styles.list]}
        onPress={() => {Actions.CarTypePlan()}}
      >
        <View>
          <Image source={{ uri: item.auto_type_pic }} style={styles.carImage} />
        </View>
        <View style={[style.ml10, styles.title]}>
          <View style={styles.customerType}>
            <Text>{item.product_name}</Text>
          </View>
          <Text style={[styles.carType]}>{item.auto_type_name}</Text>
          <View style={styles.priceDetail}>
            <Text>首付</Text>
            <Text style={[style.pl5, style.textOrange]}>{item.rent_down_payment}</Text>
            <Text style={style.pl20}>月供</Text>
            <Text style={[style.pl5, style.textOrange]}>{item.monthly_rent}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { allCarTypeList } = this.props;
    return (
      <BaseView title="车型方案">
        <View style={styles.topItem}>
          <TouchableOpacity activeOpacity={1} onPress={this.toSelectPrice}>
            <View style={[styles.item]}>
              <Text>筛选</Text>
              <Image source={images.icon.arrowDown} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={this.selcetCar}>
            <View style={styles.item}>
              <Text>{Object.keys(this.props.selectBrand).length > 0 ? this.props.selectBrand.name : '选择品牌'}</Text>
              <Image source={images.icon.arrowDown} style={styles.image} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatList}
          data={allCarTypeList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />

      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { selectBrand, selectSeries, selectType } = state.auto;
  const { allCarTypeList } = state.plan;
  return { selectBrand, selectSeries, selectType, allCarTypeList };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getAllCarType }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarTypeList);
