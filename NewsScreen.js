import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'

const newsUrl = 'http://toutiao-ali.juheapi.com/toutiao/index'
const appCode = 'APPCODE b8a415fd4c884651ba74827cdbe3ccbc'
const header = new Headers()
export default class NewsScreen extends Component {

  getRequest (url) {
    /*网络请求的配置*/
    header.append('Authorization', appCode)
    const opts = {
      method: 'GET',
      headers: header
    }
    fetch(url, opts)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        alert(responseText);
      })
      .catch((error) => {
        alert(error)
      })
  }

  render () {

    return (
      <ScrollView>
        <Text style={styles.text} onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'First Details',
          })
        }}>新闻详情</Text>
        <Text style={styles.text} onPress={() => this.getRequest(newsUrl)}>get请求</Text>
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
