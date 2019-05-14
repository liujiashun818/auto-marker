import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import Picker from 'react-native-picker';

import { Actions } from 'react-native-router-flux';
import debounce from 'lodash.debounce';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import Steps from '../../components/Steps/index';
import Message from '../../components/Message';

import styles from '../../styles';
import iStyles from './style/artificer_info';
import images from '../../images';

import { ArtificerInfoStepItems } from './constants';

import {
  setArtificerName,
  setStartWorkTime,
  submitArtificerEditBasic,
} from '../../redux/user/actions';

class ArtificerInfoBasicEdit extends SafeComponent {
  constructor(props) {
    super(props);
    const now = moment();
    const selectMonthValues = [];
    const datePickerValues = [];

    while (now.year() >= 2000 && now.month() >= 0) {
      datePickerValues.push(now.format('YYYY-MM'));
      now.month(now.month() - 1);
    }

    this.state = {
      isDateTimePickerVisible: false,
      showDatePicker: false,
      SelectMonthValues: selectMonthValues,
      DatePickerValues: datePickerValues,
      pickDate: null,
    };

    [
      'onPressBack',
      'onArtificerNameChange',
      'onSelectCity',
      'onSelectBrand',
      'onSubmitEdit',
      'showDateTimePicker',
      'handlePickerModalConfirm',
      'handlePickerModalCancel',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillUnmount() {
    Picker.hide();
  }

  onPressBack() {
    const { isEdited } = this.props;

    if (isEdited) {
      Alert.alert(
        '提示',
        '当前页面信息未保存，是否离开？',
        [
          { text: '取消' },
          { text: '确定', onPress: Actions.pop },
        ],
      );
    } else {
      Actions.pop();
    }
  }

  onArtificerNameChange(value) {
    this.props.actions.setArtificerName(value);
  }

  onSelectCity() {
    Actions.LocationSelector();
  }

  onSelectBrand() {
    Actions.AutoBrandSelector();
  }

  onSubmitEdit() {
    // 检查必填项
    const {
      artificerName,
      startWorkTime,
      currentProvince,
      currentCity,
      currentDistrict,
      skilledBrands,
    } = this.props;

    let error = '';
    if (!(artificerName)) {
      error = '请填写姓名';
    } else if (!(currentProvince && currentCity && currentDistrict)) {
      error = '请选择所在城市';
    } else if (!Object.keys(skilledBrands).length) {
      error = '请选择擅长品牌';
    } else if (!startWorkTime) {
      error = '请选择入行时间';
    }

    if (error) {
      // Alert.alert('提示', error);
      Message.show(error);
    } else {
      this.props.actions.submitArtificerEditBasic({
        name: artificerName,
        province: currentProvince,
        city: currentCity,
        country: currentDistrict,
        skilled_brands: Object.keys(skilledBrands).join(','),
        started_work_time: startWorkTime,
      }, Actions.ArtificerInfoAuditEdit);
    }
  }

  showDateTimePicker() {
    const datePickerValues = this.state.DatePickerValues || [];
    const pickedDate = this.state.pickedDate;
    const datePickerSelected = pickedDate ? [pickedDate] : [];

    Picker.init({
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择月份',
      pickerToolBarFontSize: 18,
      pickerFontSize: 18,
      pickerData: datePickerValues,
      selectedValue: datePickerSelected,
      onPickerConfirm: this.handlePickerModalConfirm,
      onPickerCancel: this.handlePickerModalCancel,
    });

    Picker.show();
  }

  handlePickerModalConfirm(dataArr) {
    this.setState({
      showDatePicker: false,
    });
    this.props.actions.setStartWorkTime(dataArr[0]);
  }

  handlePickerModalCancel() {
    this.setState({
      showDatePicker: false,
    });
  }

  render() {
    const currentUser = this.props.currentUser || {};
    const {
      artificerName,
      startWorkTime,
      currentProvince,
      currentCity,
      currentDistrict,
      skilledBrands,
    } = this.props;
    const { isDateTimePickerVisible } = this.state;

    const city = (currentCity === '市辖区' || currentCity === '县') ? '' : currentCity;
    const location = `${currentProvince}${city ? ` ${city}` : ''}${
      currentDistrict ? ` ${currentDistrict}` : ''}`;

    const goodAtBrands = Object.values(skilledBrands).join('、');
    let startWorkDate;
    // 日期选择器
    if (startWorkTime) {
      startWorkDate = moment(startWorkTime, 'YYYY-MM').toDate();
      if (startWorkDate === 'Invalid date') startWorkDate = null;
    } else {
      startWorkDate = null;
    }

    const leftBtn = {
      title: '返回',
      tintColor: '#fff',
      handler: this.onPressBack,
      style: {
        paddingLeft: 5,
      },
    };

    return (
      <BaseView title="补全认证信息" leftButton={leftBtn}>

        <View style={styles.container}>
          {/* 步骤指示器 */}
          <Steps position={0} items={ArtificerInfoStepItems} />

          {
            currentUser.status === 2 ? (
              <View style={[iStyles.auditFailCell]}>
                <View style={[iStyles.auditFail]}>
                  <Text style={iStyles.auditFailText}>
                    {`驳回原因：${currentUser.audit_fail_reason || '信息不符'}`}
                  </Text>
                </View>
              </View>
            ) : (null)
          }

          <View style={[iStyles.basicCell]}>
            <Text style={iStyles.cellLabel}>姓名</Text>
            <TextInput
              style={[iStyles.cellInput]}
              placeholder="请填写真实姓名"
              underlineColorAndroid="transparent"
              value={artificerName}
              onChangeText={this.onArtificerNameChange}
              maxLength={16}
            />
          </View>
          <TouchableOpacity
            style={[iStyles.basicCell]}
            onPress={debounce(this.onSelectCity, 250, { leading: true, trailing: false })}
          >
            <Text style={iStyles.cellLabel}>所在城市</Text>
            <Text style={iStyles.cellContext}>{location || '请选择'}</Text>
            <Image style={styles.ml5} source={images.icon.arrowRight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[iStyles.basicCell]}
            onPress={debounce(this.showDateTimePicker, 250, { leading: true, trailing: false })}
          >
            <Text style={iStyles.cellLabel}>入行时间</Text>
            <Text style={iStyles.cellContext}>{startWorkTime || '请选择'}</Text>
            <Image style={styles.ml5} source={images.icon.arrowRight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[iStyles.basicCell]}
            onPress={debounce(this.onSelectBrand, 250, { leading: true, trailing: false })}
          >
            <Text style={iStyles.cellLabel}>擅长品牌</Text>
            <Text style={iStyles.cellContext}>{goodAtBrands || '请选择'}</Text>
            <Image style={styles.ml5} source={images.icon.arrowRight} />
          </TouchableOpacity>

          <View style={iStyles.nextButtonContainer}>
            <TouchableOpacity style={iStyles.nextButton} onPress={this.onSubmitEdit}>
              <Text style={iStyles.nextButtonText}>下一步</Text>
            </TouchableOpacity>
          </View>
        </View>

      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  const {
    isEdited,
    artificerName,
    startWorkTime,
    currentProvince,
    currentCity,
    currentDistrict,
    skilledBrands,
  } = state.artificer;
  return {
    isEdited,
    currentUser,
    artificerName,
    startWorkTime,
    currentProvince,
    currentCity,
    currentDistrict,
    skilledBrands,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setArtificerName,
      setStartWorkTime,
      submitArtificerEditBasic,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtificerInfoBasicEdit);
