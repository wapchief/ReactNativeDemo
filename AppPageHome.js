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
} from 'react-native'
import Toast from 'react-native-root-toast';

import {StackNavigator, TabBarTop, TabNavigator} from "react-navigation";
// import {Navigator} from "react-native-deprecated-custom-components";
import NewsScreen from './NewsScreen'
import HomeScreen from './HomeScreen'
import MyScreen from './MyScreen'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu,\n',
  android:
  '开启调试：真机请摇晃手机，\n 部分机型可点击选择键,\n' +
  '模拟器请使用 com+m',
})
type Props = {};

//组件前面必须声明 export default关键字 说明该组件是可以导出的 或者说 是允许其他组件或者场景导入的
export default class AppPageHome extends Component<Props> {
  render () {
    return <RootStackView/>
  }
}

// noinspection JSUnusedAssignment
const TabViewPages = {  // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页面
  Home: {  // 路由名称
    screen: HomeScreen,  // 对应的路由页面
    navigationOptions:{
      // tabBarLabel: '首页',
      title:'首页'
    },
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {  // 指定路由页面的配置选项
      tabBarLabel: '新闻',   // 表示tab的标题
      title: '新闻',  // 可用作头部标题 headerTitle ，或者Tab标题 tabBarLabel
    },
  }
  ,
  My: {
    screen: MyScreen,
    navigationOptions: {
      tabBarLabel: '我的',
      title: '我的',
    },
  },
};
const TabViewConfigs = {
  // initialRouteName: 'HomeScreen',  // 初始显示的Tab对应的页面路由名称
  tabBarComponent: TabBarTop, // Tab选项卡组件，有 TabBarBottom 和 TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop 。
  tabBarPosition: 'top', // 设置选项卡的位置，在顶部或是底部，有'top'与'bottom'可选
  lazy: false,  // 是否懒加载页面
  indicatorStyle: {backgroundColor: '#00000000'},
  tabBarOptions: {} // 在属性TabBarBottom与TabBarTop中有所不同
};

const TitleBar = {  // 表示导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等等
  // initialRouteName: 'HomeScreen',
  navigationOptions: {
    title: 'Welcome to learn React Native!',
    headerStyle: {backgroundColor: '#5da8ff'},  // 设置导航头部样式
    headerTitleStyle: {color: '#333333'},  // 设置导航头部标题样式
  }
};


//设置Tab
const Tab = TabNavigator(TabViewPages, TabViewConfigs);
const StackRouteConfigs = {
  Tab: {
    screen: Tab,
  }
};

const RootStackView = StackNavigator(StackRouteConfigs);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  // 按钮style
  button: {
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop:5
  },
  //导航器
  navigator:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  //指示器
  indicator:{
    backgroundColor:'#F5FCFF'
  }
})

