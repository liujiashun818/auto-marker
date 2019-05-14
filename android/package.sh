#!/usr/bin/env bash
#curl 'http://localhost:8081/index.android.bundle?platform=android' > app/src/main/assets/index.android.bundle

# 下面对应四个打包方式，debug、beta、test1、release
# 不需要打的包可以使用"#"注释掉
#./gradlew assembleDebug
#./gradlew assembleBeta
./gradlew assembleDtest1
#./gradlew assembleDtest2
#./gradlew assembleRelease
