
import React,{Component} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'
export default class NewsScreen extends Component {
  render() {
    return (
      <ScrollView >
      <Text style={styles.text}>NewsScreen-ScrollView</Text>
        <Text style={styles.text}>NewsScreen-ScrollView</Text>
        <Text style={styles.text}>NewsScreen-ScrollView</Text>

        <Text style={styles.text}>NewsScreen-ScrollView</Text>

        <Text style={styles.text}>NewsScreen-ScrollView</Text>

        <Text style={styles.text}>NewsScreen-ScrollView</Text>

      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  text:{
    marginTop: 100
  }
})
