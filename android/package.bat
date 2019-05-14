@rem curl 'http://localhost:8081/index.android.bundle?platform=android' > app/src/main/assets/index.android.bundle

:: 下面对应四个打包方式，debug、beta、test1、release
:: 不需要打的包可以使用"::"注释掉
.\gradlew.bat assembleDebug
.\gradlew.bat assembleBeta
.\gradlew.bat assembleDtest1
.\gradlew.bat assembleRelease

