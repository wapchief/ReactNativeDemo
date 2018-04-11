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
  Button, Image,
} from 'react-native'
import Toast from 'react-native-root-toast';
import {StackNavigator, TabBarTop, TabNavigator} from "react-navigation";
import MyScreen from './MyScreen'
import NewsScreen from './NewsScreen'
import HomeScreen from './HomeScreen'
import DetailsScreen from './project/NewsDetails'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu,\n',
  android:
  '开启调试：真机请摇晃手机，\n 部分机型可点击选择键,\n' +
  '模拟器请使用 com+m',
})
type Props = {};
//组件前面必须声明 export default关键字 说明该组件是可以导出的 或者说 是允许其他组件或者场景导入的
class RootApp extends Component{

  render () {
    return (<View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
        To get started, edit App.justify
      </Text>
      <Text style={styles.instructions}>
        {instructions}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => {alert('继续')}}>
        <Text>button确认窗口</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
        Alert.alert(
          '提示',
          '确定要删除吗?',
          [
            {text: '取消', onPress: () => Toast.show('取消')},
            {text: '确定', onPress: () => Toast.show('确定')},
          ]
        )
      }}>
        <Text>button取消、确认窗口</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Toast.show('message')}>
        <Text>Show Toast</Text>
      </TouchableOpacity>

      <Button
        style={styles.button}
        title='进入首页'
        onPress={() => this.props.navigation.navigate('Tabs')}
      />
        <Button
          style={styles.button}
          title='进入详情'
          onPress={() => this.props.navigation.navigate('Details')}
        />
    </View>
    )
  }

}
//程序入口，需绑定所有路由
class App extends Component<Props> {

  render () {
    return <RootStack/>
  }
}

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
      marginTop: 5
    },
  })

// noinspection JSUnusedAssignment
const TabViewPages = {  // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页面
  Home: {  // 路由名称
    screen: HomeScreen,  // 对应的路由页面
    navigationOptions:{
      tabBarLabel:'首页',
      title:'首页',
      tabBarIcon: ({tintColor}) =>
        <Image
          style={{width: 30, height: 30}}
          source={require('./res/drawable/head_other.png')}/>,
    },
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {  // 指定路由页面的配置选项
      tabBarLabel: '新闻',   // 表示tab的标题
      title: '新闻',  // 可用作头部标题 headerTitle ，或者Tab标题 tabBarLabel
      tabBarIcon: ({tintColor}) =>
        <Image
          style={{width: 30, height: 30}}
          source={require('./res/drawable/head_other.png')}/>,
    },
  }
  ,
  My: {
    screen: MyScreen,
    navigationOptions: {
      tabBarLabel: '我的',
      title: '我的',
      tabBarIcon: ({tintColor}) =>
        <Image
          style={{width: 30, height: 30}}
          source={require('./res/drawable/head_other.png')}/>,
    },
  },
};
//tab配置
const TabViewConfigs = {
  // initialRouteName: 'HomeScreen',  // 初始显示的Tab对应的页面路由名称
  tabBarComponent: TabBarTop, // Tab选项卡组件，有 TabBarBottom 和 TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop 。
  tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'与'bottom'可选
  lazy: false,  // 是否懒加载页面
  indicatorStyle: {backgroundColor: '#00000000'},
  //显示tabIcon
  tabBarOptions: {
    showIcon: true,
  } // 在属性TabBarBottom与TabBarTop中有所不同
};
const Tab = TabNavigator(TabViewPages, TabViewConfigs);
//每个路由都是独立的，如果存在tab，则需要把tab下的所有页面当做为一个路由，注册
const RootStack= StackNavigator({
  //启动页
  AppRoot:{
    screen: RootApp
  },
  //注册tab页面（注意是一个整体的路由）
  Tabs:{
    screen:Tab
  },
  //新闻详情
  Details:{
    screen: DetailsScreen,
    navigationOptions:{
      // tab:null
    }
  },
})



export default App