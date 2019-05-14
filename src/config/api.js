import apiConfig from './apiConfig';

const { apiSkip, apiLimit, baseUrls } = apiConfig;
const BASE_URI = baseUrls[AData.PackageMode.Mode] || baseUrls[AData.PackageMode.Debug];

// 屏蔽黄色警告提示
if (AData.PackageMode.Mode !== AData.PackageMode.Debug) {
  console.disableYellowBox = true;
}

const api = {
  // 工具
  utility: {
    // 获取服务器时间，用于修正本地时间
    getSystemTime() {
      return `${BASE_URI}/system/server-time`;
    },
    // 请求是否有新版本
    getNewVersionInfo(platform, currentVersion) {
      return `${BASE_URI}/system/is-need-update?device_type=${platform.toLowerCase()}&version_code=${currentVersion}&build=${currentVersion}`;
    },
  },

  system: {
    getServerTime() {
      return `${BASE_URI}/system/server-time`;
    },
  },

  // 七牛云
  qiniu: {
    // 上传文件地址
    getUploadUrl() {
      return 'https://up.qbox.me';
    },
    // 车标图片地址
    getBrandLogo(brandId) {
      return `https://oh4vsloz1.qnssl.com/car_brand_${brandId}`;
    },
    // 公共，如头像
    getPublicPicUploadToken(fileType = 'pic', ext = '') {
      return `${BASE_URI}/system/get-public-pic-upload-token?file_type=${fileType}&ext=${ext}`;
    },
    getPublicPicUrl(fileName = '', thumbType = 0) {
      if (fileName.length === 0) return '';
      return `${BASE_URI}/system/get-public-pic-url?file_name=${fileName}&thumb_type=${thumbType}`;
    },
    // 私有，如证件照
    getPrivatePicUploadToken(fileType = 'pic', ext = '') {
      return `${BASE_URI}/system/get-private-pic-upload-token?file_type=${fileType}&ext=${ext}`;
    },
    getPrivatePicUrl(fileName = '', thumbType = 0) {
      if (fileName.length === 0) return '';
      return `${BASE_URI}/system/get-private-pic-url?file_name=${fileName}&thumb_type=${thumbType}`;
    },
    // 技术问答,
    getQaPublicUploadToken(fileType = 'pic', ext = '') {
      return `${BASE_URI}/system/get-qa-public-file-upload-token?file_type=${fileType}&ext=${ext}`;
    },
    getQaPublicUrl(fileName = '', thumbType = 0) {
      if (fileName.length === 0) return '';
      return `${BASE_URI}/system/get-qa-public-file-url?file_name=${fileName}&thumb_type=${thumbType}`;
    },
  },

  user: {
    getVerifyCode() {
      return `${BASE_URI}/user/get-code`;
    },
    login() {
      return `${BASE_URI}/user/login`;
    },
    logout() {
      return `${BASE_URI}/user/logout`;
    },
    info() {
      return `${BASE_URI}/user/info`;
    },
    editAvatar() {
      return `${BASE_URI}/user/edit-avatar`;
    },
  },

  // 技师相关
  artificer: {
    // 获取验证码，POST
    getAuthCode() {
      return `${BASE_URI}/user/get-code`;
    },
    // 技师登陆，POST
    login() {
      return `${BASE_URI}/user/login`;
    },
    // 技师注销，POST
    logout() {
      return `${BASE_URI}/user/logout`;
    },
    // 技师信息，GET
    info() {
      return `${BASE_URI}/user/info`;
    },
    editAvatar() {
      return `${BASE_URI}/user/edit-avatar`;
    },

    // below unused

    // 技师信息编辑提交，POST
    basicEdit() {
      return `${BASE_URI}/user/submit-basic`;
    },
    // 技师信息提交审核，POST
    submitAudit() {
      return `${BASE_URI}/user/submit-audit`;
    },
    // 技师信息编辑，POST
    edit() {
      return `${BASE_URI}/user/edit`;
    },
    // 充值记录
    chargeLog() {
      return `${BASE_URI}/user/charge-list`;
    },
    // 体现记录
    withdrawLog() {
      return `${BASE_URI}/user/withdraw-list`;
    },
    // 收入记录
    incomeLog() {
      return `${BASE_URI}/artificer/income-list`;
    },
    // 提问支付记录
    payLog() {
      return `${BASE_URI}/artificer/pay-list`;
    },
  },

  customer: {
    add() {
      return `${BASE_URI}/customer/create`;
    },
    edit() {
      return `${BASE_URI}/customer/edit`;
    },
    list(page, key) {
      return `${BASE_URI}/customer/customer-list?key=${key}&skip=${((page - 1) *
        apiLimit)}&limit=${apiLimit}`;
    },
  },

  // 位置相关
  location: {
    // 地理位置反编码，根据经纬度获取位置名字
    getLocationNameInfo(longitude, latitude) {
      return `${BASE_URI}/system/get-address-by-location?location=${longitude},${latitude}`;
    },
    // 省份列表
    provinceList() {
      return `${BASE_URI}/system/province-list`;
    },
    // 某省份城市列表
    cityList(provinceName) {
      return `${BASE_URI}/system/city-list?province=${provinceName}`;
    },
    // 某城市区县列表
    countryList(provinceName, cityName) {
      return `${BASE_URI}/system/country-list?province=${provinceName}&city=${cityName}`;
    },
  },

  // 车辆信息相关
  auto: {
    getBrandList() {
      return `${BASE_URI}/system/auto-brand-list`;
    },
    getBrandLabelList() {
      return `${BASE_URI}/system/auto-brand-label-list`;
    },
    getBrandSeries(brandId) {
      return `${BASE_URI}/system/series-list-by-brand?auto_brand_id=${brandId}`;
    },
    getSeriesTypes(seriesId) {
      return `${BASE_URI}/system/type-list-by-series?auto_series_id=${seriesId}`;
    },
  },

  // 推送消息相关
  notification: {
    // 获取推送消息的内容
    getDetail(pushId = '', customerId = '') {
      return `${BASE_URI}/message/push-accept?push_id=${pushId}&artificer_id=${customerId}`;
    },
  },

  IAP: {
    verify() {
      return `${BASE_URI}/artificer/charge`;
    },
  },

  question: {
    questionList() {
      return `${BASE_URI}/article/list`;
    },
  },
  banner: {
    mainBanner() {
      return `${BASE_URI}/banner/list`;
    },
  },
  plan: {
    hotPlan() {
      return `${BASE_URI}/plan/hot-list?skip=0&limit=15`;
    },
    allCarTypeList(rentDownPay = ' 0-1000000', monthlyRent = '0-100000', carType = 0) {
      return `${BASE_URI}/plan/fix-amount-list?rent_down_payment=${rentDownPay}&monthly_rent=${monthlyRent}&auto_brand_id=${carType}&skip=0&limit=10`;
    },
    createSelectCarType() {
      return `${BASE_URI}/question/create-question`;
    },
  },
};

export default api;
