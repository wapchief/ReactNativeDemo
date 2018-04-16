/* 首页 */
import React,{Component} from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions'
import Toast from 'react-native-root-toast'
const screenWidth = Dimensions.get('window').width;
const urlBanner = 'http://www.wanandroid.com/banner/json'
export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShow:false,
      data:'',
      items:[],
      urls:[]
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        isShow: true
      })
      this.getRequest(urlBanner)
    },0)
  }

  //监听
  //列表点击事件
  itemClick(item, index) {
    // alert('新闻标题：' + item.author_name + '\n时间：' + item.date+'\n'+item.thumbnail_pic_s);
    this.props.navigation.navigate('Details', {
      title: index,
      url:this.state.urls[index],
    })
    // alert(this.state.items[0]+',index:'+index)
  }

  //轮播
  _imageBanner  () {
        //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
    return(
      this.state.items.map((item,index)=> {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={this.itemClick.bind(this, item, index)}>
            <Image
              key={index}
              style={{height: 200, width: screenWidth}}
                   resizeMode='cover'
                   source={{uri: item}}/>

          </TouchableOpacity>
        )
      })

    )
  }

  //重新遍历map集合
  addMap(resultData){

    for (let i = 0; i < resultData.length; i++) {
      this.state.items.push(resultData[i].imagePath)
      this.state.urls.push(resultData[i].url)
    }
    this.setState({
      items: this.state.items,
      urls: this.state.urls,
    })
  }


  //请求banner
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
          data:responseJson.data,
        });
        // alert(this.state.data[0].imagePath)
        this.addMap(responseJson.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  render() {
    if(this.state.isShow){
      return (
      <ScrollView style={{}}>
        <Swiper
                removeClippedSubviews={false}
                key={this.state.urls.length}
                autoplay = {true}
                height = {200}
                showsPagination = {true}
                horizontal={true}>
          {this._imageBanner()}
        </Swiper>
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
          onPress={() => Toast.show(this.state.data[0].title)}
        />
      </ScrollView>
    )}else {
        return (
          <View style={styles.imgView}>
            <Image source={ require('./res/drawable/head_other.png')} style={styles.bannerImg} />
          </View>
        )
    }
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
    width:'100%',
    height:200,
    flex:1
  },
  imgView: {
    flex: 1,
    height: 200,
  },
  bannerImg: {
    width: '100%',
    height: 200,
    flex: 1
  }
})
