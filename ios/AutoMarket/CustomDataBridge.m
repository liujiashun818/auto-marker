//
//  CustomDataBridge.m
//  AutoMarket
//
//  Created by 王彬 on 17/03/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "CustomDataBridge.h"

/**
 * 向JS导出数据
 */
@implementation CustomDataBridge

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  //向JS导出的数据
  NSMutableDictionary *dic = [NSMutableDictionary new];
  
  //打包模式
  [dic setValue:[NSNumber numberWithInteger:__PACKAGE_MODE] forKey:@"packageMode"];
  
  //app信息
  NSDictionary* infoDic =[[NSBundle mainBundle] infoDictionary];
  [dic setValue:[infoDic objectForKey:@"CFBundleShortVersionString"] forKey:@"appVersion"];         //app版本简称
  [dic setValue:[infoDic objectForKey:@"CFBundleVersion"] forKey:@"appSecondVersion"];              //app版本全称
  [dic setValue:[infoDic objectForKey:@"CFBundleDisplayName"] forKey:@"appName"];                   //app名字
  
  return dic;
}

@end
