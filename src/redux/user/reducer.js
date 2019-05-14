import InitialState from './initialState';

const initialState = new InitialState();

const {
  // 重置分解技师信息
  RESET_USER_INFO,

  SAVE_AVATAR_REQUEST,
  SAVE_AVATAR_SUCCESS,
  SAVE_AVATAR_FAILURE,

  // 设置定位位置信息
  SET_LOCATION_INFO,
  // 设置技师姓名信息
  SET_ARTIFICER_NAME_INFO,
  // 设置身份证号信息
  SET_ID_NUMBER_INFO,
  // 设置支付宝账号信息
  SET_ALIPAY_NUMBER_INFO,
  // 设置入行时间
  SET_START_WORK_TIME,
  // 设置身份证图片
  SET_ID_CARD_IMAGE_INFO,
  // 设置工牌图片
  SET_WORKER_CARD_IMAGE_INFO,
  // 设置头像图片
  SET_AVATAR_IMAGE_INFO,
  // 设置当前省份
  SET_CURRENT_PROVINCE,
  // 设置当前城市
  SET_CURRENT_CITY,
  // 设置当前区县
  SET_CURRENT_DISTRICT,
  // 选择擅长的品牌
  SELECT_GOOD_AT_BRAND,
  // 请求省份列表
  GET_PROVINCE_LIST_REQUEST,
  GET_PROVINCE_LIST_SUCCESS,
  GET_PROVINCE_LIST_FAILURE,
  // 某省份城市列表
  GET_CITY_LIST_REQUEST,
  GET_CITY_LIST_SUCCESS,
  GET_CITY_LIST_FAILURE,
  // 某城市区县列表
  GET_DISTRICT_LIST_REQUEST,
  GET_DISTRICT_LIST_SUCCESS,
  GET_DISTRICT_LIST_FAILURE,
  // 获取车品牌列表
  GET_AUTO_BRANDS_LIST_REQUEST,
  GET_AUTO_BRANDS_LIST_SUCCESS,
  GET_AUTO_BRANDS_LIST_FAILURE,
  // 技师信息提交编辑
  SUBMIT_ARTIFICER_EDIT_REQUEST,
  SUBMIT_ARTIFICER_EDIT_SUCCESS,
  SUBMIT_ARTIFICER_EDIT_FAILURE,
  // 技师信息编辑提交审核
  SUBMIT_ARTIFICER_AUDIT_REQUEST,
  SUBMIT_ARTIFICER_AUDIT_SUCCESS,
  SUBMIT_ARTIFICER_AUDIT_FAILURE,
} = require('../reduxActionTypes').default;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    case RESET_USER_INFO: {
      return state.set('currentUser', action.payload);

      // const {
      //   name,
      //   id_card_num,
      //   province,
      //   city,
      //   country,
      //   skilled_brands,
      //   skilled_brand_names,
      //   alipay_account,
      //   started_work_time,
      //   id_card_pic,
      //   avatar_pic,
      // } = action.payload || {};
      //
      // // 处理品牌
      // const brandIdArr = (skilled_brands || '').split(',');
      // const brandNameArr = (skilled_brand_names || '').split(',');
      // const brandObj = {};
      // brandIdArr.map((brandId, index) => {
      //   if (brandId && brandNameArr[index]) {
      //     brandObj[brandId] = brandNameArr[index];
      //   }
      // });
      //
      // return state
      //   .set('isEdited', false)
      //   .set('name', name || '')
      //   .set('idNumber', id_card_num || '')
      //   .set('currentProvince', province || '')
      //   .set('currentCity', city || '')
      //   .set('currentDistrict', country || '')
      //   .set('skilledBrands', brandObj)
      //   .set('aliPayNumber', alipay_account || '')
      //   .set('startWorkTime', started_work_time || '')
      //   .set('idCardImg', id_card_pic || '')
      //   .set('idCardImgUri', '')
      //   .set('workerCardImgUri', '')
      //   .set('avatarImg', avatar_pic || '');
    }

    case SAVE_AVATAR_REQUEST:
      return state.set('isUploading', true);
    case SAVE_AVATAR_SUCCESS:
      return state.set('isUploading', false);
    case SAVE_AVATAR_FAILURE:
      return state.set('isUploading', false);


    // 设置定位位置信息
    case SET_LOCATION_INFO: {
      const { province, city, country } = action.payload || {};
      return state
        .set('isEdited', true)
        .set('locationInfo', action.payload)
        .set('currentProvince', province || '')
        .set('currentCity', city || '')
        .set('currentDistrict', country) || '';
    }

    // 设置技师姓名信息
    case SET_ARTIFICER_NAME_INFO: {
      return state
        .set('isEdited', true)
        .set('name', action.payload);
    }
    // 设置身份证号信息
    case SET_ID_NUMBER_INFO: {
      return state
        .set('isEdited', true)
        .set('idNumber', action.payload);
    }
    // 设置支付宝账号信息
    case SET_ALIPAY_NUMBER_INFO: {
      return state
        .set('isEdited', true)
        .set('aliPayNumber', action.payload);
    }
    // 设置入行时间
    case SET_START_WORK_TIME: {
      return state
        .set('isEdited', true)
        .set('startWorkTime', action.payload);
    }
    // 设置身份证图片
    case SET_ID_CARD_IMAGE_INFO: {
      return state
        .set('isEdited', true)
        .set('idCardImg', action.payload.imageName || '')
        .set('idCardImgUri', action.payload.imageUri || '');
    }
    // 设置工牌图片
    case SET_WORKER_CARD_IMAGE_INFO: {
      return state
        .set('isEdited', true)
        .set('workerCardImg', action.payload.imageName || '')
        .set('workerCardImgUri', action.payload.imageUri || '');
    }
    // 设置头像图片
    case SET_AVATAR_IMAGE_INFO: {
      return state
        .set('isEdited', true)
        .set('avatarImg', action.payload.imageName || '')
        .set('avatarImgUri', action.payload.imageUri || '');
    }
    // 设置当前省份
    case SET_CURRENT_PROVINCE: {
      return state
        .set('isEdited', true)
        .set('currentProvince', action.payload)
        .set('currentCity', '')
        .set('currentDistrict', '')
        .set('districtList', []);
    }
    // 设置当前城市
    case SET_CURRENT_CITY: {
      return state
        .set('isEdited', true)
        .set('currentCity', action.payload)
        .set('currentDistrict', '');
    }
    // 设置当前区县
    case SET_CURRENT_DISTRICT: {
      return state
        .set('isEdited', true)
        .set('currentDistrict', action.payload);
    }
    // 选择擅长的品牌
    case SELECT_GOOD_AT_BRAND: {
      const brandId = action.payload._id;
      const brandName = action.payload.name;
      const skilledBrands = Object.assign({}, state.get('skilledBrands', {}));
      if (skilledBrands[brandId]) {
        delete skilledBrands[brandId];
      } else {
        skilledBrands[brandId] = brandName;
      }
      return state
        .set('isEdited', true)
        .set('skilledBrands', skilledBrands);
    }

    // 请求省份列表
    case GET_PROVINCE_LIST_REQUEST: {
      return state
        .set('provinceListFetching', true)
        .set('provinceListError', null);
    }
    case GET_PROVINCE_LIST_SUCCESS: {
      return state
        .set('provinceListFetching', false)
        .set('provinceList', action.payload);
    }
    case GET_PROVINCE_LIST_FAILURE: {
      return state
        .set('provinceListFetching', false)
        .set('provinceListError', action.payload);
    }

    // 某省份城市列表
    case GET_CITY_LIST_REQUEST: {
      return state
        .set('cityListFetching', true)
        .set('cityListError', null);
    }
    case GET_CITY_LIST_SUCCESS: {
      return state
        .set('cityListFetching', false)
        .set('cityList', action.payload);
    }
    case GET_CITY_LIST_FAILURE: {
      return state
        .set('cityListFetching', false)
        .set('cityListError', action.payload);
    }

    // 某城市区县列表
    case GET_DISTRICT_LIST_REQUEST: {
      return state
        .set('districtListFetching', true)
        .set('districtListError', null);
    }
    case GET_DISTRICT_LIST_SUCCESS: {
      return state
        .set('districtListFetching', false)
        .set('districtList', action.payload);
    }
    case GET_DISTRICT_LIST_FAILURE: {
      return state
        .set('districtListFetching', false)
        .set('districtListError', action.payload);
    }

    // 获取车品牌列表
    case GET_AUTO_BRANDS_LIST_REQUEST: {
      return state
        .set('autoBrandListFetching', true)
        .set('autoBrandListError', null);
    }
    case GET_AUTO_BRANDS_LIST_SUCCESS: {
      return state
        .set('autoBrandListFetching', false)
        .set('autoBrandList', action.payload);
    }
    case GET_AUTO_BRANDS_LIST_FAILURE: {
      return state
        .set('autoBrandListFetching', false)
        .set('autoBrandListError', action.payload);
    }

    // 技师信息提交编辑
    case SUBMIT_ARTIFICER_EDIT_REQUEST: {
      return state
        .set('submitArtificerEditPosting', true)
        .set('submitArtificerEditError', null);
    }
    case SUBMIT_ARTIFICER_EDIT_SUCCESS: {
      return state
        .set('isEdited', false)
        .set('submitArtificerEditPosting', false);
    }
    case SUBMIT_ARTIFICER_EDIT_FAILURE: {
      return state
        .set('submitArtificerEditPosting', false)
        .set('submitArtificerEditError', action.payload);
    }

    // 技师信息编辑提交审核
    case SUBMIT_ARTIFICER_AUDIT_REQUEST: {
      return state
        .set('submitArtificerAuditPosting', true)
        .set('submitArtificerAuditError', null);
    }
    case SUBMIT_ARTIFICER_AUDIT_SUCCESS: {
      return state
        .set('isEdited', false)
        .set('submitArtificerAuditPosting', false);
    }
    case SUBMIT_ARTIFICER_AUDIT_FAILURE: {
      return state
        .set('submitArtificerAuditPosting', false)
        .set('submitArtificerAuditError', action.payload);
    }

    default:
      return state;
  }
}
