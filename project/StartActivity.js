/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native'

import {Navigator} from 'react-native-deprecated-custom-components';
import App from '../App'
import AppPageHome from '../AppPageHome'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu,\n',
  android:
  '开启调试：真机请摇晃手机，\n 部分机型可点击选择键,\n' +
  '模拟器请使用 com+m',
})
type Props = {};
//组件前面必须声明 export default关键字 说明该组件是可以导出的 或者说 是允许其他组件或者场景导入的
export default class StartActivity extends Component<Props> {

  render() {
    let defaultName = 'App';// 第一个要展示的组件
    let defaultComponent = App;
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }} />
    );
  }

}




