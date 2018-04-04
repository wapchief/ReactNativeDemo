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
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu,\n',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu\n' +
  '请摇晃手机使用 reload，\n 部分机型可点击选择键,\n' +
  '模拟器请使用 com+m',
})
type Props = {};
export default class App extends Component<Props> {
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
        <TouchableOpacity style={styles.button} onPress={()=>Toast.show('message')}>
          <Text>Show Toast</Text>
        </TouchableOpacity>
      </View>
    )
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
    marginTop:5
  },
})
