import React from 'react';
import { Button, View, Text, WebView } from 'react-native'
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Dimensions from 'Dimensions'

const screenWidth = Dimensions.get('window').width;

export default class DetailsScreen extends React.Component {


  static _loadError(e){
    return(
      <View >
        <Text>Error:{e}</Text>
      </View>
    )}

  // _onNavigationStateChange = (navState) => {
  //   console.log(navState)
  //   alert(navState)
  // }
  render() {
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const newsUrl = params ? params.url : null;

    return (
        <WebView
          style={{width:screenWidth,height:'100%'}}
          source={{uri:newsUrl}}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onError={(e)=> DetailsScreen._loadError.bind(this,e)}/>

    );
  }
}

