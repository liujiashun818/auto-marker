## Fastlane及Bugsnag配置说明

### 配置fastlane

1. 检查系统ruby环境
2. 安装gem

### 配置bugsnag

**目前只使用release下的配置**，开发和测试环境下的问题，发布前优先修复完成

1. 生成并上传source maps文件

   1. **生成**source maps文件	

      * debug  ios|android

        ```shell
        # ios
        $ react-native bundle \
          --platform ios \
          --dev true \
          --entry-file index.ios.js \
          --bundle-output ./bundle/index.ios.bundle \
          --sourcemap-output ./bundle/index.ios.bundle.map
          
        # android 
        $ react-native bundle \
          --platform android \
          --dev true \
          --entry-file index.android.js \
          --bundle-output ./bundle/index.android.bundle \
          --sourcemap-output ./bundle/index.android.bundle.map
        ```

      * release

        ```shell
        # ios
        $ react-native bundle \
          --platform ios \
          --dev false \
          --entry-file index.ios.js \
          --bundle-output ./bundle/index.ios.bundle \
          --sourcemap-output ./bundle/index.ios.bundle.map
          
        # android 
        $ react-native bundle \
          --platform android \
          --dev false \
          --entry-file index.android.js \
          --bundle-output ./bundle/index.android.bundle \
          --sourcemap-output ./bundle/index.android.bundle.map
        ```

        ​

   2. **上传**source maps文件到bugsnag

      1. 安装上传工具

         ```shell
         $ npm install -g bugsnag-sourcemaps@1.0.0-rc.4
         ```

      2. 开始上传

         * debug

           ```shell
           # ios
           $ bugsnag-sourcemaps upload \
                --api-key ed0543c416037fc2abe9db339ba2c6d1 \
                --source-map ./bundle/index.ios.bundle.map \
                --strip-project-root \
                --minified-file ./bundle/index.ios.bundle \
                --minified-url http://localhost:8081/index.ios.bundle?platform=ios&dev=true&minify=false\
                --upload-sources
                
           # android
           $ bugsnag-sourcemaps upload \
                --api-key ed0543c416037fc2abe9db339ba2c6d1 \
                --source-map ./bundle/index.android.bundle.map \
                --strip-project-root \
                --minified-file ./bundle/index.android.bundle \
                --minified-url http://localhost:8081/index.android.bundle?platform=android&dev=true&minify=false \
                --upload-sources
           ```

         * release

           ```shell
           #ios
           $ bugsnag-sourcemaps upload \
                --api-key ed0543c416037fc2abe9db339ba2c6d1 \
                --source-map ./bundle/index.ios.bundle.map \
                --strip-project-root \
                --minified-file ./bundle/index.ios.bundle \
                --minified-url main.jsbundle \
                --upload-sources
                
           # android
           $ bugsnag-sourcemaps upload \
                --api-key ed0543c416037fc2abe9db339ba2c6d1 \
                --source-map ./bundle/index.android.bundle.map \
                --strip-project-root \
                --minified-file ./bundle/index.android.bundle \
                --minified-url index.android.bundle \
                --upload-sources     
           ```

   ​

2. iOS上传dSYM文件

   1. 手动上传工具安装，安装bugsnag-dsym-upload

      ```shell
      $ brew install https://raw.github.com/bugsnag/bugsnag-upload/master/tools/homebrew/bugsnag-dsym-upload.rb
      ```

   2. 手动上传

      ```shell
      $ bugsnag-dsym-upload 水稻员工版.app.dSYM.zip
      ```

      ​

