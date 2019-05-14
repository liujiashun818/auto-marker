/**
 * 默认的签名key
 * 第一次业务请求钱会先使用这个请求key进行签名初始化工作
 */
export const DefaultSignKey = '8bf8460f544edce2a69aa4108568fe78f770e223';

/**
 * 数据请求默认分页策略
 */
export const ApiSkip = 0;
export const ApiLimit = 10;

/**
 * 项目在不同打包配置下的baseUrl
 * 在api中会自动根据打包模式选择对应的baseUrl
 */
export const BaseUrls = {
  [AData.PackageMode.Debug]: 'https://api.daotian.dev2.yunbed.com/dealer',   // debug
  [AData.PackageMode.Test1]: 'https://api.daotian.dev1.yunbed.com/dealer',   // test1
  [AData.PackageMode.Test2]: 'https://api.daotian.dev2.yunbed.com/dealer',   // test2
  [AData.PackageMode.Beta]: 'https://api.daotian.yunbed.com/dealer',         // beta
  [AData.PackageMode.Release]: 'https://api.daotian.shuidao.com/dealer',     // release
};

const apiConfig = {
  defaultSignKey: DefaultSignKey,

  apiSkip: ApiSkip,
  apiLimit: ApiLimit,

  baseUrls: BaseUrls,
};

export default apiConfig;
