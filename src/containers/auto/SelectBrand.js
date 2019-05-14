import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  Image,
  InteractionManager,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import style from '../../styles/index';
import colors from '../../styles/colors';
import Loading from '../../components/Loading/index';
import SelectSeriesModal from './SelectSeriesModal';
import BaseView from '../../components/BaseView/index';
import {
  getBrands,
  setSelectBrand,
  getBrandSeries,
  setSelectSeries,
} from '../../redux/auto/actions';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => {
    r1 !== r2;
  },
  sectionHeaderHasChanged: (s1, s2) => {
    s1 !== s2;
  },
});

class SelectBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (Object.keys(this.props.brands).length === 0) {
        this.props.actions.getBrands();
      }
    });
  }

  /**
   * 1. 第一次选择品牌，加载该品牌的车系
   * 2. 第二次点击相同品牌，显示车系，不加载数据
   * @param brand
   */
  handleSelectBrand(brand) {
    const { selectBrand } = this.props;

    // TODO 编辑车辆时，如果选择同一个品牌，首次不加载车系
    if (brand._id !== selectBrand._id) {
      this.props.actions.setSelectBrand(brand);
    }
    // 编辑的情况不加载，先放出
    this.props.actions.getBrandSeries(brand._id);

    this.setState({ visible: true });
  }

  /**
   * 选中一个车系
   * 1. 未选择过，保存
   * 2. 选择相同数据，忽略
   * @param series
   */
  handleSelectSeries(series) {
    const { selectSeries } = this.props;
    if (this.props.jumpTwoPage) {
      Actions.pop({ popNum: 2 });
    } else {
      Actions.pop();
    }

    if (series._id !== selectSeries._id) {
      this.props.actions.setSelectSeries(series);
    }

    // 关闭modal，下次进入时不显示
    this.setState({ visible: false });
  }

  renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={styles.groupTitle} key={sectionId}>
        <Text style={[style.font12, style.textDefault]}>
          {sectionId === '#' ? '常用品牌' : sectionId}
        </Text>
      </View>
    );
  }

  renderBrandRow(brand, sectionID, rowID) {
    return (
      <TouchableOpacity
        style={[styles.groupItem]}
        onPress={() => this.handleSelectBrand(brand)}
      >
        <Image
          source={{ uri: `https://oh4vsloz1.qnssl.com/car_brand_${brand._id}` }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text style={[style.textDefault, style.font16]}>{brand.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      isFetchBrand,
      isFetchSeries,
      brands,
      series,
      selectBrand,
      selectSeries,
    } = this.props;
    const { visible } = this.state;

    return (
      <BaseView title="选择品牌">

        <Loading isLoading={isFetchBrand} />

        <ListView
          style={style.container}
          dataSource={dataSource.cloneWithRowsAndSections(brands, Object.keys(brands))}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={(...arg) => this.renderBrandRow(...arg)}
          enableEmptySections
          initialListSize={10}
          pageSize={1}
        />

        <SelectSeriesModal
          visible={visible}
          isFetching={isFetchSeries}
          series={series}
          selectBrand={selectBrand}
          selectSeries={selectSeries}
          onSelectSeries={(...arg) => this.handleSelectSeries(...arg)}
        />
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const {
    isFetchBrand,
    isFetchSeries,
    brands,
    series,
    selectBrand,
    selectSeries,
  } = state.auto;
  return {
    isFetchBrand,
    isFetchSeries,
    brands,
    series,
    selectBrand,
    selectSeries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBrands,
      setSelectBrand,
      getBrandSeries,
      setSelectSeries,
    }, dispatch),
  };
}

const styles = StyleSheet.create({
  groupTitle: {
    height: 20,
    backgroundColor: colors.viewBG,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItem: {
    height: 55,
    backgroundColor: colors.white,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },
  leftOpenList: {
    flexDirection: 'row',
  },

  leftBar: {
    width: 55,
    height: AData.ScreenHeight,
    backgroundColor: 'rgba(127, 127, 127, .5)',
  },
  rightContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBrand);
