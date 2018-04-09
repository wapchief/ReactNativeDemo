import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Toast from 'react-native-root-toast'

export default class MyScreen extends Component {
  render () {
    return (
      <ScrollView>
        <View style={styles.rootView}>
          <TouchableOpacity
            onPress={() => Toast.show('修改头像')}>
            <Image
              style={{width: 80, height: 80, marginTop: 20}}
              source={require('./res/drawable/head_other.png')}/>
          </TouchableOpacity>
          <Text style={{marginTop: 10}} onPress={() => Toast.show('修改用户名')}>
            用户名
          </Text>
        </View>
        <View style={{backgroundColor: '#ffffff'}}>
          <Image
            style={{width: 80, height: 80, marginTop: 20}}
            source={require('./res/drawable/head_other.png')}/>
          <Text style={{marginTop: 10}}>
            用户名
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rootView: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }
})
