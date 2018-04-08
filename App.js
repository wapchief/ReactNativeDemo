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
import Toast from 'react-native-root-toast';
import { SafeAreaView, StackNavigator } from 'react-navigation'
import NewsScreen from './NewsScreen'
// import StackNavigator from 'react-navigation'
// import {Navigator} from 'react-native-deprecated-custom-components';
// import AppPageHome from './AppPageHome'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu,\n',
  android:
  '开启调试：真机请摇晃手机，\n 部分机型可点击选择键,\n' +
  '模拟器请使用 com+m',
})
type Props = {};
//组件前面必须声明 export default关键字 说明该组件是可以导出的 或者说 是允许其他组件或者场景导入的
class App extends Component<Props>{

  render () {
    return (
      <View style={styles.container}>
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
          onPress={() => this.props.navigation.navigate("AppPageHome")}
        />
      </View>
    )
  }

  _goToMore() {
    // Toast.show(this.props.navigation.title.toString())
    // this.props
    //   .navigation
    //   .navigate('Details', {
    //     itemId: 86,
    //     otherParam: 'anything you want here',
    // })
    // const  navigator  = this.props;
    // if (navigator) {
    //   try {
    //     navigator.push({
    //       name: 'AppPageHome',
    //       component: AppPageHome,
    //     })
    //   }catch (e) {
    //     Toast.show(e.message)
    //   }
    // }
  }

}
// const PageHome = StackNavigator({
//   navigation: { screen: AppPageHome },
// });
// const App = StackNavigator({
//   Main: {screen: AppPageHome},
// });

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
})

export default StackNavigator({
  AppHome: {
    screen: App,
  },
});
