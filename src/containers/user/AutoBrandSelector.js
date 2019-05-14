import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import React from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import debounce from 'lodash.debounce';

import api from '../../config/api';

import Message from '../../components/Message';
import SafeComponent from '../../components/SafeComponent';
import images from '../../images';
import styles from '../../styles';
import absStyles from './style/auto_brands_selector';
import BaseView from '../../components/BaseView/index';
import * as artificerActions from '../../redux/user/actions';

class LocationSelector extends SafeComponent {
  constructor(props) {
    super(props);

    this.state = {
      brandsDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };

    [
      'handlePressBrand',
      'handlePressSave',
      'renderListRow',
      'renderSectionHeader',
      'renderListFooter',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.props.actions.getAutoBrandList();
  }

  handlePressBrand(brand) {
    const {skilledBrands} = this.props;
    if (Object.keys(skilledBrands).length < 3 || skilledBrands[brand._id]) {
      this.props.actions.selectGoodAtBrand(brand);
    } else {
      // Alert.alert('提示', '您最多可以选择三个品牌');
      Message.show('您最多可以选择三个品牌');
    }
  }

  handlePressSave() {
    const {skilledBrands} = this.props;
    if (Object.keys(skilledBrands).length) {
      Actions.pop();
    } else {
      // Alert.alert('提示', '请至少选择一个擅长品牌');
      Message.show('请至少选择一个擅长品牌');
    }
  }

  renderListRow(rowData, sectionID, rowID, highlightRow) {
    const {skilledBrands} = this.props;
    let brandId = rowData._id;

    return (
      <TouchableOpacity
        key={brandId}
        style={[absStyles.absCell, styles.ph10]}
        onPress={debounce(() => this.handlePressBrand(rowData), 250, {
          leading: true,
          trailing: false,
        })}
      >
        <Image style={absStyles.absCellImg} source={{uri: api.qiniu.getBrandLogo(brandId)}}/>
        <Text numberOfLines={1} style={absStyles.absCellTitle}>{rowData.name || ''}</Text>
        <Image
          style={absStyles.absCellCheckImg}
          source={skilledBrands[brandId]
            ? images.icon.checkboxYellow
            : images.icon.checkboxYellowEmpty}
        />
      </TouchableOpacity>
    );
  }

  renderSectionHeader() {
    const {skilledBrands} = this.props;
    let skillBrandsStr = Object.values(skilledBrands)
      .join('、');

    return (
      <View style={[absStyles.absSectionHeader, styles.ph10]}>
        <Text numberOfLines={1} style={absStyles.absSectionHeaderText}>
          {skillBrandsStr ? `已选择${skillBrandsStr}` : '请选择擅长品牌'}
        </Text>
      </View>
    );
  }

  renderListFooter() {
    return (
      <View style={[absStyles.absSectionHeader, styles.ph10]}>
      </View>
    );
  }

  render() {
    const {autoBrandList} = this.props;
    let dataSource = this.state.brandsDs.cloneWithRows(autoBrandList);


    let rightBtn = {
      title: '确定',
      tintColor: '#fff',
      handler: this.handlePressSave,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title="擅长品牌"
                rightButton={rightBtn}
      >

        <View style={styles.container}>
          <ListView
            enableEmptySections
            showsVerticalScrollIndicator={false}
            style={absStyles.absList}
            dataSource={dataSource}
            renderRow={this.renderListRow}
            renderSectionHeader={this.renderSectionHeader}
            renderFooter={this.renderListFooter}

            removeClippedSubviews
            initialListSize={40}
            pageSize={20}
            scrollRenderAheadDistance={300}
          />
        </View>
      </BaseView>
    );
  }
}

function

mapStateToProps(state) {
  const {
    autoBrandListFetching,
    autoBrandListError,
    autoBrandList,
    skilledBrands,
  } = state.artificer;
  return {
    autoBrandListFetching,
    autoBrandListError,
    autoBrandList,
    skilledBrands,
  };
}

function

mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...artificerActions}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelector);
