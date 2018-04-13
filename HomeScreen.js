/* 首页 */
import React,{Component} from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions'
const screenWidth = Dimensions.get('window').width;
export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShow: false,
      items:[]
    }
  }

  componentDidMount() {
    let item;
    for (let i = 0; i < 3; i++) {
      switch (i) {
        case 0: {
          item = 'http://blogdailyherald.com/wp-content/uploads/2013/04/382065_560557460633306_930109857_n.jpg';
          break;
        }
        case 1: {
          item = 'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg';
          break;
        }
        default: {
          item = 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/3812b31bb051f819dc048662dbb44aed2e73e7f1.jpg';
          break;
        }
      }
      this.state.items.push(item);

    }
    this.setState({
      isShow: true,
      items: this.state.items
    })
  }

  //轮播
  _imageBanner(){
    return(
    this.state.items.map((item, index) => {
      //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
      return (<Image style={{height: 200, width:screenWidth}} key = {index} resizeMode='cover' source={{uri: item}}/>)
    })
    )
  }
  getRequest (url) {
    /*网络请求的配置*/
    const opts = {
      method: 'GET',
    }
    fetch(url, opts)
      .then((response) => {
        this.setState({refreshing: false});
        return response.json();
      })
      .then((responseJson) => {
        this.setState({
          resultJson:responseJson,
          error_code:responseJson.error_code,
          reason:responseJson.reason,
          result:responseJson.result,
          data:responseJson.result.data,
          // name:responseJson.result.data.name,
          // date:responseJson.result.data.date,
          // title:responseJson.result.data.title,

        });
        // alert(this.state.reason)
      })
      .catch((error) => {
        alert(error)
      })
  }
  render() {
    return (
      <View style={{ flex: 1,alignItems:'flex-start'}}>
        <View style={{height: 200,alignItems:'flex-start'}}>
        <Swiper autoplay = {true}
                height = {200}
                showsPagination = {true}
                dotColor="white"
                horizontal={true}>
          {this._imageBanner()}
        </Swiper>
        </View>
        <Text
          title="Go to My"
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
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subTitle:{
    marginTop:10,
    color:'#666666',
    fontSize:12,
    flex:1
  },
  imgStyle:{
    width:screenWidth,
    height:150
  }
})
