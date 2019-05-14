import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  ListView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import style from '../../styles';
import colors from '../../styles/colors';
import Loading from '../../components/Loading/index';
import Message from '../../components/Message/index';

import images from '../../images/index';

import * as autoActions from '../../redux/auto/actions';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const styles = StyleSheet.create({
  itemContent: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 45,
    minWidth: 200,
  },

  topHeader: {
    height: 20,
    backgroundColor: colors.viewBG,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

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
    paddingHorizontal: 15,
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
});

class SelectTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      stateObj: {},
      selectType: props.selectType || {},
    };

    [
      'showModal',
      'hideModal',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.selectType) !== JSON.stringify(this.props.selectType)) {
      this.setState({ selectType: nextProps.selectType });
    }

    if (JSON.stringify(this.props.types) !== JSON.stringify(nextProps.types)) {
      // 是否已有选中的车型
      const { selectType } = this.props;
      const stateObj = {};
      nextProps.types.map((type) => {
        stateObj[type._id] = false;
      });

      if (selectType) {
        stateObj[selectType._id] = true;
      }
      this.setState({ stateObj });
    }
  }

  handleSelectType(type) {
    const { stateObj } = this.state;
    const typeName = `${type.year} ${type.version}`;

    for (const typeId in stateObj) {
      stateObj[typeId] = false;
    }
    stateObj[type._id] = true;
    type.name = typeName;

    this.setState({
      stateObj,
      visible: false,
      selectType: type,
    });

    this.props.onSelectType({
      _id: type._id,
      name: typeName,
    });
  }

  showSeriesTypesModal() {
    const { seriesId } = this.props;
    if (!seriesId || seriesId.toString() === '0') {
      Message.show('请选择品牌车系');
      return;
    }

    this.props.actions.getSeriesTypes(seriesId);
    this.setState({ visible: true });
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  renderTypeRow(type) {
    const { stateObj } = this.state;
    return (
      <TouchableOpacity
        style={[styles.groupItem, stateObj[type._id] ? { justifyContent: 'space-between' } : null]}
        key={type._id}
        onPress={this.handleSelectType.bind(this, type)}
      >
        <Text>{type.year} {type.version}</Text>
        {stateObj[type._id] ?
          <Image source={images.icon.selectTick} /> : null}
      </TouchableOpacity>
    );
  }

  render() {
    const { isFetchTypes, types } = this.props;
    const { visible, selectType } = this.state;

    const configTitle = {
      title: '选择车型',
      tintColor: colors.dark,
    };

    return (
      <View>
        <TouchableOpacity style={styles.itemContent} onPress={this.showSeriesTypesModal.bind(this)}>
          <Text
            numberOfLines={1} style={[style.textDefault, style.mr5, {
              flex: 1,
              textAlign: 'right',
            }]}
          >{selectType.name ? selectType.name : '选择车型'}</Text>
          <Image source={images.icon.arrowRight} />
        </TouchableOpacity>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visible}
          onRequestClose={this.hideModal}
        >
          <View style={[style.view]}>
            <StatusBar
              backgroundColor={colors.yellow}
              barStyle="default"
            />
            <NavigationBar
              title={configTitle}
              tintColor={colors.yellow}
              statusBar={{ style: 'default' }}
              leftButton={
                <TouchableOpacity
                  style={style.btnBack}
                  onPress={this.hideModal}
                >
                  <Image source={images.icon.topIconBack} />
                </TouchableOpacity>
              }
            />

            <Loading isLoading={isFetchTypes} />

            <View style={[style.modal, { marginTop: 0, paddingTop: 0, backgroundColor: 'transparent' }]}>
              <ListView
                style={style.container}
                dataSource={ds.cloneWithRows(types)}
                renderRow={this.renderTypeRow.bind(this)}
                enableEmptySections
                initialListSize={10}
                pageSize={1}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


function mapStateToProps(state) {
  const { isFetchTypes, types, selectType } = state.auto;
  return { isFetchTypes, types, selectType };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(autoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTypeModal);
