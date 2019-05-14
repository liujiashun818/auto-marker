import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Alert, Image, ListView, Text, TouchableOpacity, View } from 'react-native';

import { Actions } from 'react-native-router-flux';
import debounce from 'lodash.debounce';

import SafeComponent from '../../components/SafeComponent';

import utility from '../../utils/StringUtil';
import Location from '../../utils/location';

import images from '../../images';

import styles from '../../styles';
import lsStyles from './style/location_selector';

import * as artificerActions from '../../redux/user/actions';
import BaseView from '../../components/BaseView/index';
//位置类型描述
const locationDesc = {
  province: '省份/直辖市',
  city: '市',
  district: '区县',
};

class LocationSelector extends SafeComponent {
  constructor(props) {
    super(props);

    this.state = {
      provinceDs: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      cityDs: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      districtDs: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };

    [
      'handleSelectLocation',
      'handlePressLocationIcon',
      'handlePressSave',
      'renderListRow',
      'renderSectionHeader',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const { currentProvince, currentCity } = this.props;
    if (!this.props.locationInfo) {
      Location.getLocation(null, this.props.actions.setLocationInfo);
    }
    let province = currentProvince || '北京市';
    let city = currentCity || '市辖区';

    //请求省,市，县区级行政单位
    this.props.actions.getProvinceList();
    this.props.actions.getCityList(province);
    this.props.actions.getDistrictList(province, city);
  }

  handleSelectLocation(type, name) {
    const { currentProvince } = this.props;
    let _type = utility.firstLetterUpper(type);
    let propName = 'current' + _type;
    //重复选择当前位置，不做处理
    if (name !== this.props[propName]) {
      let actionName = 'setCurrent' + _type;
      this.props.actions[actionName](name);
      if (type === 'province') {
        this.props.actions.getCityList(name);
      } else if (type === 'city') {
        this.props.actions.getDistrictList(currentProvince, name);
      }
    }
  }

  handlePressLocationIcon() {
    Location.getLocation(null, this.props.actions.setLocationInfo);
  }

  handlePressSave() {
    const {
      currentProvince,
      currentCity,
      currentDistrict,
    } = this.props;

    //判断是否选择了位置
    if (currentProvince && currentCity && currentDistrict) {
      Actions.pop();
    } else {
      Alert.alert('提示', '请选择您当前的 省/直辖市、市、县/区 位置。');
    }
  }

  renderListRow(type, rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity
        style={[lsStyles.lsCell, styles.ph10]}
        onPress={debounce(() => this.handleSelectLocation(type, rowData.name), 250, {
          leading: true,
          trailing: false,
        })}
      >
        <Text numberOfLines={1}>{rowData.name || ''}</Text>
      </TouchableOpacity>
    );
  }

  renderSectionHeader(type) {
    let text = locationDesc[type] || locationDesc['province'];
    return (
      <View style={[lsStyles.lsSectionHeader, styles.ph10]}>
        <Text numberOfLines={1} style={lsStyles.lsSectionHeaderText}>{text}</Text>
      </View>
    );
  }

  render() {
    const {
      currentProvince,
      currentCity,
      currentDistrict,
      provinceList,
      cityList,
      districtList,
    } = this.props;

    //忽略直辖市的'市辖区'和'县'
    let city = (currentCity === '市辖区' || currentCity === '县') ? '' : currentCity;
    let location = `${currentProvince}${city ? ' ' + city : ''}${currentDistrict ? ' ' +
      currentDistrict : ''}`;

    let dsMap = {
      province: this.state.provinceDs.cloneWithRows(provinceList),
      city: this.state.cityDs.cloneWithRows(cityList),
      district: this.state.districtDs.cloneWithRows(districtList),
    };

    let rightBtn = {
      title: '确定',
      tintColor: '#fff',
      handler: this.handlePressSave,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title="选择城市"
                rightButton={rightBtn}
      >

        <View style={styles.container}>
          <View style={[lsStyles.lsCell, lsStyles.lsFirstCell]}>
            <Text style={lsStyles.lsCurrentText} numberOfLines={1}>当前城市</Text>
            <TouchableOpacity onPress={debounce(this.handlePressLocationIcon, 250, {
              leading: true,
              trailing: false,
            })}>
              <Image
                style={lsStyles.lsLocationIcon}
                source={images.icon.locationIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={lsStyles.lsCurrentLocation} numberOfLines={1}>{location}</Text>
          </View>

          <View style={[lsStyles.lsSelectContainer, { backgroundColor: '#ffffff' }]}>
            {
              Object.keys(dsMap)
                .map((type, index) => (
                  <ListView
                    key={type}
                    enableEmptySections
                    showsVerticalScrollIndicator={false}
                    style={[lsStyles.lsList, index === 1 ? lsStyles.lsListBorderHorizontal : null]}
                    dataSource={dsMap[type]}
                    renderRow={(...args) => this.renderListRow(type, ...args)}
                    renderSectionHeader={() => this.renderSectionHeader(type)}
                  />
                ))
            }
          </View>
        </View>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const {
    currentProvince,
    currentCity,
    currentDistrict,
    provinceList,
    cityList,
    districtList,
    locationInfo,
  } = state.artificer;
  return {
    currentProvince,
    currentCity,
    currentDistrict,
    provinceList,
    cityList,
    districtList,
    locationInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...artificerActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelector);
