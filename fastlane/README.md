fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

## Choose your installation method:

<table width="100%" >
<tr>
<th width="33%"><a href="http://brew.sh">Homebrew</a></td>
<th width="33%">Installer Script</td>
<th width="33%">Rubygems</td>
</tr>
<tr>
<td width="33%" align="center">macOS</td>
<td width="33%" align="center">macOS</td>
<td width="33%" align="center">macOS or Linux with Ruby 2.0.0 or above</td>
</tr>
<tr>
<td width="33%"><code>brew cask install fastlane</code></td>
<td width="33%"><a href="https://download.fastlane.tools">Download the zip file</a>. Then double click on the <code>install</code> script (or run it in a terminal window).</td>
<td width="33%"><code>sudo gem install fastlane -NV</code></td>
</tr>
</table>

# Available Actions
## Android
### android test
```
fastlane android test
```
Runs all the tests
### android debug
```
fastlane android debug
```
debug: Submit a new Debug Build to Pgyer
### android test1
```
fastlane android test1
```
Test1: Submit a new Test1 Build to Pgyer
### android test2
```
fastlane android test2
```
Test2: Submit a new Test2 Build to Pgyer
### android beta
```
fastlane android beta
```
Beta: Submit a new Beta Build to Pgyer
### android release
```
fastlane android release
```
Release: Package a new release version

----

## iOS
### ios test
```
fastlane ios test
```
Runs all the tests
### ios test1
```
fastlane ios test1
```
test1: 打包并上传到蒲公英

This will also make sure the profile is up to date
### ios test2
```
fastlane ios test2
```
test2: 打包并上传到蒲公英

This will also make sure the profile is up to date
### ios beta
```
fastlane ios beta
```
Submit a new Beta Build to Apple TestFlight

This will also make sure the profile is up to date
### ios release
```
fastlane ios release
```
Deploy a new version to the App Store
### ios refresh_dsyms
```
fastlane ios refresh_dsyms
```
sync dsyms files to bugsnag

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
