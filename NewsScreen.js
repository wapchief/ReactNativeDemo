import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import App from './App'
import { Navigator } from 'react-native-deprecated-custom-components'
import DetailsScreen from './project/NewsDetails'

class NewsScreens extends Component {

  render () {
    return (
      <ScrollView>
        <Text style={styles.text} onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'First Details',
          })
        }}>新闻详情
        </Text>
        <Text style={styles.text}>NewsScreen-ScrollView</Text>
        <Text style={styles.text}>NewsScreen-ScrollView</Text>

        <Text style={styles.text}>NewsScreen-ScrollView</Text>

        <Text style={styles.text}>NewsScreen-ScrollView</Text>

        <Text style={styles.text}>NewsScreen-ScrollView</Text>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 100
  }
})

const RootStack = StackNavigator(
  {
    News:{
      screen: NewsScreens,
      navigationOptions:{
        //隐藏子路由标题栏
        header:null
      }
    },
    Details:{
      screen: DetailsScreen,
      navigationOptions:{
        tab:null
      }
    }
  },
  {
    navigationOptions: {
    },
  }
)
export default class AppStart extends React.Component {
  render() {
    return <RootStack />;
  }
}