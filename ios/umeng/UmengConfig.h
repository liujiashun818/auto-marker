//
//  UmengConfig.h
//  daotianToB
//
//  Created by 王彬 on 26/12/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#ifndef UmengConfig_h
#define UmengConfig_h

//从项目配置判断打包模式，并设置不同打包方式下的Umeng友盟统计UMENG_APPKEY_VALUE和UMENG_CHANNEL_VALUE
//__PACKAGE_MODE:0(Release),1(Beta),2(Debug),3(Test1),4(Test2)
#ifdef BETA
// __PACKAGE_MODE 1         //Beta
#define UMENG_APPKEY_VALUE @"592900dc4544cb56b5000fef"
#define UMENG_CHANNEL_VALUE @"iOS beta"
#else
#ifdef TEST1
// __PACKAGE_MODE 3         //Test1
#define UMENG_APPKEY_VALUE @"592900dc4544cb56b5000fef"
#define UMENG_CHANNEL_VALUE @"iOS test1"
#else
#ifdef TEST2
// __PACKAGE_MODE 4         //Test2
#define UMENG_APPKEY_VALUE @"592900dc4544cb56b5000fef"
#define UMENG_CHANNEL_VALUE @"iOS test2"
#else
#ifdef DEBUG
// __PACKAGE_MODE 2         //Debug
#define UMENG_APPKEY_VALUE @"592900dc4544cb56b5000fef"
#define UMENG_CHANNEL_VALUE @"iOS debug"
#else
// __PACKAGE_MODE 0         //Release
#define UMENG_APPKEY_VALUE @"592900a71061d209c3000ea8"
#define UMENG_CHANNEL_VALUE @"iOS"
#endif
#endif
#endif
#endif


#endif /* UmengConfig_h */
