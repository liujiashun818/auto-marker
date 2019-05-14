import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';

import Button from 'apsl-react-native-button';

import BaseView from '../../components/BaseView';
import Loading from '../../components/Loading/index';
import ModalActionSheet from '../../components/ActionSheet/ModalActionSheet';
import CheckBox from '../../components/CheckBox/index';

import images from '../../images/index';

import styles from '../../styles/index';

import { addCustomer, editCustomer } from '../../redux/customer/actions';

/**
 * 添加客户
 */
class Add extends Component {
  constructor(props) {
    super(props);
    const customer = props.customer || {};
    this.state = {
      isEdit: props.isEdit || false,
      isShowGender: false,
      isShowProfession: false,
      professionName: customer.profession_name || '',
      name: customer.name || '',
      phone: customer.phone || '',
      gender: customer.gender || '',
      age: customer.age || '',
      profession: customer.profession || '',
      customer,
    };

    this.professions = [
      {
        title: '公务员/事业单位',
        handler: this.onActionSheetItemClick.bind(this, '1'),
      }, {
        title: '教师',
        handler: this.onActionSheetItemClick.bind(this, '2'),
      }, {
        title: '医生',
        handler: this.onActionSheetItemClick.bind(this, '3'),
      }, {
        title: '其他',
        handler: this.onActionSheetItemClick.bind(this, '0'),
      },
    ];

    this.onCancel = this.onCancel.bind(this);
    this.onActionSheetItemClick = this.onActionSheetItemClick.bind(this);
  }

  onActionSheetItemClick(profession) {
    switch (profession) {
      case '1':
        this.setState({
          profession,
          professionName: '公务员/事业单位',
        });
        break;
      case '2':
        this.setState({
          profession,
          professionName: '教师',
        });
        break;
      case '3':
        this.setState({
          profession,
          professionName: '医生',
        });
        break;
      case '0':
        this.setState({
          profession,
          professionName: '其他',
        });
        break;
      default:
        this.setState({
          profession,
          professionName: '未知',
        });
    }
  }

  onGenderChange(gender) {
    this.setState({ gender });
  }

  onCancel() {
    this.setState({ isShowProfession: false });
  }

  onProfessionPress() {
    this.setState({ isShowProfession: true });
  }

  onSubmit() {
    const {
      name,
      phone,
      gender,
      age,
      profession,
      customer,
    } = this.state;

    if (this.props.isEdit) {
      this.props.actions.editCustomer({
        customer_id: customer._id,
        name,
        phone,
        gender,
        age,
        profession,
      });
    } else {
      this.props.actions.addCustomer({
        name,
        phone,
        gender,
        age,
        profession,
      });
    }
  }

  render() {
    const { isUpdating } = this.props;
    const {
      isEdit,
      isShowProfession,
      professionName,
      gender,
      customer,
    } = this.state;

    return (
      <BaseView title={isEdit ? '编辑客户' : '添加客户'}>
        <Loading isLoading={isUpdating} />

        <ScrollView>
          <View style={[styles.formGroup, styles.mb15]}>
            <View style={styles.formGroupTitle}>
              <Text style={styles.formGroupTitleText}>必填项</Text>
            </View>
            <View style={styles.formGroupBody}>
              <View style={styles.formControl}>
                <Text style={styles.formLabel}>姓名</Text>
                <TextInput
                  defaultValue={customer.name}
                  style={styles.formInput}
                  underlineColorAndroid="transparent"
                  keyboardType="phone-pad"
                  placeholder={'请输入'}
                  placeholderTextColor="#999999"
                  onChangeText={name => this.setState({ name })}
                  clearButtonMode={'while-editing'}
                />
              </View>

              <View style={[styles.formControl, styles.noBorderBottom]}>
                <Text style={styles.formLabel}>手机号</Text>
                <TextInput
                  defaultValue={customer.phone}
                  style={styles.formInput}
                  underlineColorAndroid="transparent"
                  keyboardType="phone-pad"
                  placeholder={'请输入'}
                  placeholderTextColor="#999999"
                  onChangeText={phone => this.setState({ phone })}
                  maxLength={11}
                  clearButtonMode={'while-editing'}
                />
              </View>
            </View>
          </View>

          <View style={[styles.formGroup, styles.mb30]}>
            <View style={styles.formGroupTitle}>
              <Text style={styles.formGroupTitleText}>选填项</Text>
            </View>
            <View style={styles.formGroupBody}>
              <View style={[styles.formControl, { justifyContent: 'flex-start' }]}>
                <Text style={styles.formLabel}>性别</Text>
                <CheckBox
                  label={'男'}
                  checked={String(gender) === '1'}
                  checkedImage={images.icon.checkboxBlue}
                  uncheckedImage={images.icon.checkboxBlueEmpty}
                  onChange={() => this.onGenderChange(1)}
                />
                <CheckBox
                  label={'女'}
                  checked={String(gender) === '0'}
                  checkedImage={images.icon.checkboxBlue}
                  uncheckedImage={images.icon.checkboxBlueEmpty}
                  onChange={() => this.onGenderChange(0)}
                />
              </View>

              <View style={styles.formControl}>
                <Text style={styles.formLabel}>年龄</Text>
                <TextInput
                  defaultValue={customer.age}
                  style={styles.formInput}
                  underlineColorAndroid="transparent"
                  keyboardType="phone-pad"
                  placeholder={'请输入'}
                  placeholderTextColor="#999999"
                  onChangeText={age => this.setState({ age })}
                  maxLength={11}
                  clearButtonMode={'while-editing'}
                />
              </View>

              <View style={[styles.formControl, styles.noBorderBottom]}>
                <Text style={styles.formLabel}>职业</Text>
                <TouchableOpacity
                  style={[styles.flexRowRight, { flex: 1, height: 56 }]}
                  onPress={() => this.onProfessionPress()}
                >
                  <Text style={[styles.f16, styles.mr5]}>
                    {!professionName ? '请选择' : professionName}
                  </Text>
                  <Image source={images.icon.arrowRight} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.flexRowCenter}>
            <Button
              style={[styles.btnPrimary, { flex: 1, marginHorizontal: 40 }]}
              textstyle={styles.btnPrimaryText}
              disabled={isUpdating}
              onPress={() => this.onSubmit()}
            >
              确定
            </Button>
          </View>
        </ScrollView>

        <ModalActionSheet
          visible={isShowProfession}
          strict
          title="信用记录"
          onCancel={this.onCancel}
          actionItems={this.professions}
        />
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUpdating: state.customer.isUpdating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addCustomer, editCustomer }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
