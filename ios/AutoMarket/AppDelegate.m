/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTMiPush.h"
#import "UmengConfig.h"
#import "UMMobClick/MobClick.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //Umeng友盟统计
  UMConfigInstance.appKey = UMENG_APPKEY_VALUE;
  UMConfigInstance.channelId = UMENG_CHANNEL_VALUE;
  [MobClick startWithConfigure:UMConfigInstance];
  
  //这里postNotificationName时react-native的代码还没有开始执行，也就是react-native-mipush推送监听还没有工作。所以这里延时1s提交到NSNotificationCenter。
  //[RCTMiPush didFinishLaunchingWithOptions:launchOptions];
  [RCTMiPush performSelector:@selector(didFinishLaunchingWithOptions:) withObject:launchOptions afterDelay: 2];
  
  NSURL *jsCodeLocation;

//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.55:8081/index.ios.bundle?platform=ios&dev=true"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AutoMarket"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RCTMiPush didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
  [RCTMiPush didReceiveRemoteNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [RCTMiPush didReceiveRemoteNotification:notification];
  completionHandler(UIBackgroundFetchResultNewData);
}

- (void)application:(UIApplication *) application didRegisterUserNotificationSettings:(nonnull UIUserNotificationSettings *)notificationSettings {
  if (notificationSettings) {
    NSMutableDictionary *setting = [[NSMutableDictionary alloc] init];
    NSString *typeStr = [NSString stringWithFormat:@"%lu",(unsigned long)notificationSettings.types];
    [setting setObject:typeStr forKey:@"type"];
    [RCTMiPush didRegisterUserNotificationSettings:setting];
  }
}

- (void)application:(UIApplication *)app didFailToRegisterForRemoteNotificationsWithError:(NSError *)err
{
  // 注册APNS失败
  [RCTMiPush didFailToRegisterForRemoteNotificationsWithError:err];
}

- (void)applicationWillResignActive:(UIApplication *)application
{
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;//清空角标
}

@end
