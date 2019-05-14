import {
  Dimensions,
  Platform,
  NativeModules,
  NetInfo,
} from 'react-native';
import pack from '../../package.json';

/**
 * 常用组件参数配置
 */
import ComponentsConfig from '../components/Config';

window.AConfig = ComponentsConfig;

/**
 * 常用数据配置
 */
// 系统平台
export const OS = Platform.OS;

// 屏幕大小
export const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

// JS版本号
export const JsVersion = pack.version;

// App版本号、应用名字
const CustomDataBridge = NativeModules.CustomDataBridge;
export const AppVersion = CustomDataBridge.appVersion || '';
export const AppSecondVersion = CustomDataBridge.appSecondVersion || '';
export const AppName = CustomDataBridge.appName || '水稻技师版';

// 打包模式
const [
  PackageModeRelease,
  PackageModeBeta,
  PackageModeDebug,
  PackageModeTest1,
  PackageModeTest2,
] = [0, 1, 2, 3, 4];
const packageMode = parseInt(CustomDataBridge.packageMode, 10);
export const PackageMode = {
  Mode: packageMode,                    // 当前打包模式
  Release: PackageModeRelease,
  Beta: PackageModeBeta,
  Debug: PackageModeDebug,
  Test1: PackageModeTest1,
  Test2: PackageModeTest2,
};

window.AData = {
  OS,                                     // 平台
  ScreenWidth,                            // 屏宽
  ScreenHeight,                           // 屏高
  JsVersion,                              // JS版本
  AppVersion,                             // App版本
  AppSecondVersion,                       // App Build版本
  AppName,                                // App名字

  PackageMode,                            // 打包模式

  // 网络状态
  netType: 'WIFI',                        // 网络状态、默认WIFI、大写
  netAccessible: true,                    // 网络可用、默认可用、NONE和UNKNOWN认为不可用
};

// 网络状态获取、网络状态改变监听
const netTypeHandler = (netType) => {
  const netTypeUpper = netType.toUpperCase();
  const netAccessible = netTypeUpper !== 'UNKNOWN' && netTypeUpper !== 'NONE';
  window.AData.netType = netTypeUpper;
  window.AData.netAccessible = netAccessible;
};
NetInfo.fetch().done(netTypeHandler);
NetInfo.addEventListener('change', netTypeHandler);

export default window.AData;
