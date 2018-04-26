import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import Toast from 'react-native-root-toast'
import { StackNavigator } from 'react-navigation'
import PopupDialog, { DialogButton, DialogTitle } from 'react-native-popup-dialog'
import ImagePicker from 'react-native-image-picker'
export default class MyScreen extends Component {

  state = {
    avatarSource: null,
    videoSource: null,
    dialogShow: false,

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

  render () {
    return (
      <ScrollView>
        <View style={styles.rootView}>
          <TouchableOpacity
            onPress={() => this.selectPhotoTapped()}>
            <Image
              style={{width: 80, height: 80, marginTop: 20}}
              source={this.state.avatarSource === null ? require('./res/drawable/head_other.png') : this.state.avatarSource}/>
          </TouchableOpacity>
          <Text style={{marginTop: 10}} onPress={() =>this.popupDialog.show()}>
            用户名
          </Text>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogTitle={<DialogTitle title="修改用户名" />}
            width={0.7}
            height={0.3}
            actions={[
              <DialogButton
                text="确定"
                textStyle={{backgroundColor:'#ff22f2'}}
                onPress={() => {
                  this.popupDialog.dismiss();
                }}
                key="button-2"
              />,
            ]}
          >
            <View>
              <TextInput
                placeholder="请输入用户名！"
                onChangeText={(text) => this.setState({text})}
              />

            </View>
          </PopupDialog>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rootView: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  popWindows: {
    marginRight: 30,
    marginLeft: 30,
  }
})
