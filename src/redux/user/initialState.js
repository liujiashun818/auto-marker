import { Record } from 'immutable';

const InitialState = Record({
  // old code
  isEdited: false,                    // 是否编辑为保存
  isUploading: false,                 // 是否头像上传中
  artificerName: '',                  // 用户名
  idNumber: '',                       // 身份证号
  aliPayNumber: '',                   // 支付宝账号
  startWorkTime: '',                  // 入行时间

  locationInfo: null,                 // 位置信息 {longitude, latitude, province, city, country}

  locationDecodeRequiring: false,     // 位置解析 请求中
  locationDecode: false,              // 位置解析 成功
  locationDecodeError: null,          // 位置解析 错误

  provinceListFetching: false,        // 省份列表 请求中
  provinceListError: null,            // 省份列表 成功
  provinceList: [],                   // 省份列表 错误
  currentProvince: '',                // 当前省份

  cityListFetching: false,            // 某省份城市列表 请求中
  cityListError: null,                // 某省份城市列表 成功
  cityList: [],                       // 某省份城市列表 错误
  currentCity: '',                    // 当前城市

  districtListFetching: false,        // 某城市区县列表 请求中
  districtListError: null,            // 某城市区县列表 成功
  districtList: [],                   // 某城市区县列表 错误
  currentDistrict: '',                // 当前区县

  autoBrandListFetching: false,       // 车辆品牌列表 请求中
  autoBrandListError: null,           // 车辆品牌列表 成功
  autoBrandList: [],                  // 车辆品牌列表 错误
  skilledBrands: {},                  // 擅长车辆品牌 {id: name, ...}

  idCardImg: '',                      // 身份证照片名字
  idCardImgUri: '',                   // 身份证照片URI
  workerCardImg: '',                  // 工牌照片名字
  workerCardImgUri: '',               // 工牌照片URI
  avatarImg: '',                      // 头像照片名字
  avatarImgUri: '',                   // 头像照片URI

  submitArtificerEditPosting: false,  // 技师信息提交编辑 请求中
  submitArtificerEditError: null,     // 技师信息提交编辑 错误
  submitArtificerAuditPosting: false, // 技师信息提交审核 请求中
  submitArtificerAuditError: null,    // 技师信息提交审核 错误

});

export default InitialState;
