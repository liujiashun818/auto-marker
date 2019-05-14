import {
  Platform,
  NetInfo,
  NativeModules,
} from 'react-native';
import pack from '../../package.json';

/**
 * 系统平台
 */
export const OS = Platform.OS;

/**
 * JS版本号
 */
export const JsVersion = pack.version;

/**
 * App版本号、应用名字
 */
export const CustomDataBridge = NativeModules.CustomDataBridge;
export const AppVersion = CustomDataBridge.appVersion || '';
export const AppSecondVersion = CustomDataBridge.appSecondVersion || '';
export const AppName = CustomDataBridge.appName || '';

/**
 * 打包模式
 */
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


const DataConfig = {
  OS,      // 平台
  JsVersion,            // JS版本
  AppVersion,           // App版本
  AppSecondVersion,     // App Build版本
  AppName,              // App名字
  PackageMode,

  // 网络状态
  NetType: 'WIFI',      // 网络状态、默认WIFI、大写
  NetAccessible: true,  // 网络可用、默认可用、NONE和UNKNOWN认为不可用
};

/**
 * 网络状态获取、网络状态改变监听
 * @param networkType
 */
const netTypeHandler = (networkType) => {
  const netType = networkType.toUpperCase();
  const netAccessible = networkType !== 'UNKNOWN' && networkType !== 'NONE';
  DataConfig.netType = netType;
  DataConfig.netAccessible = netAccessible;
};
NetInfo.fetch().done(netTypeHandler);
NetInfo.addEventListener('change', netTypeHandler);

export default DataConfig;
