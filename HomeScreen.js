
import React,{Component} from 'react';
import { View, Text, Button } from 'react-native'

import Toast from 'react-native-root-toast'
import NewsDetails from './project/NewsDetails'
export default class HomeScreen extends Component {

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>HomeScreen</Text>
        <Button
          title="Go to My"
          style={{marginTop:20}}
          onPress={() => this.props.navigation.navigate('My')}
        />
        <Button
          title="Go to News"
          style={{margin:20,padding:20}}
          onPress={() => this.props.navigation.navigate('News')}
        />
        <Button
          title="Go to App"
          style={{marginTop:10}}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }

}

