#!/usr/bin/env bash

# 生成相应的js source maps文件，并上传至bugsnag

react-native bundle \
        --platform ios \
        --dev false \
        --entry-file index.ios.js \
        --bundle-output ./build/index.ios.bundle \
        --sourcemap-output ./build/index.ios.bundle.map \
&&
react-native bundle \
        --platform android \
        --dev false \
        --entry-file index.android.js \
        --bundle-output ./build/index.android.bundle \
        --sourcemap-output ./build/index.android.bundle.map \
&&
bugsnag-sourcemaps upload \
        --api-key ed0543c416037fc2abe9db339ba2c6d1 \
        --source-map ./build/index.ios.bundle.map \
        --strip-project-root \
        --minified-file ./build/index.ios.bundle \
        --minified-url main.jsbundle \
        --upload-sources \
&&
bugsnag-sourcemaps upload \
        --api-key ed0543c416037fc2abe9db339ba2c6d1 \
        --source-map ./build/index.android.bundle.map \
        --strip-project-root \
        --minified-file ./build/index.android.bundle \
        --minified-url index.android.bundle \
        --upload-sources