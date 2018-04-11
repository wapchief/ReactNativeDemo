import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Toast from 'react-native-root-toast'
import { StackNavigator } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'

export default class MyScreen extends Component {
  state = {
    avatarSource: null,
    videoSource: null
  };

  selectPhotoTapped() {
    const options = {
      takePhotoButtonTitle:'相机',
      cancelButtonTitle:'取消',
      chooseFromLibraryButtonTitle:'图库',
      storageOptions: {
        skipBackup: true,
      },
      title:'',
      //支持添加自定义选项
      customButtons: [
        // {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.rootView}>
          <TouchableOpacity
            onPress={()=>this.selectPhotoTapped()}>
            <Image
              style={{width: 80, height: 80, marginTop: 20}}
              source={require('./res/drawable/head_other.png')}/>
          </TouchableOpacity>
          <Text style={{marginTop: 10}} onPress={() => Toast.show('修改用户名')}>
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
