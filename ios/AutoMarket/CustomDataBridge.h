//
//  CustomDataBridge.h
//  AutoMarket
//
//  Created by 王彬 on 17/03/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

//从项目配置判断打包模式：__PACKAGE_MODE:0(Release),1(Beta),2(Debug),3(Test1),4(Test2)
#ifdef BETA
#define __PACKAGE_MODE 1      //Beta
#else
#ifdef TEST1
#define __PACKAGE_MODE 3      //Test1
#else
#ifdef TEST2
#define __PACKAGE_MODE 4      //Test2
#else
#ifdef DEBUG
#define __PACKAGE_MODE 2      //Debug
#else
#define __PACKAGE_MODE 0      //Release
#endif
#endif
#endif
#endif

/**
 * 向JS导出数据
 */
@interface CustomDataBridge : NSObject<RCTBridgeModule>

@end
