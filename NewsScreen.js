import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native'
import Dimensions from 'Dimensions'
const newsUrl = 'http://toutiao-ali.juheapi.com/toutiao/index'
const appCode = 'APPCODE b8a415fd4c884651ba74827cdbe3ccbc'
const header = new Headers()
const screenWidth = Dimensions.get('window').width;
export default class NewsScreen extends Component {

  constructor(props){
    super(props);
    //在这里定义json返回的key
    this.state={
      //下拉刷新
      refreshing: false,
      //data数据
      resultJson:null,
      error_code:'',
      reason:'',
      result: {
        data: ''
      }
    };
  }


  //在最初的render方法调用之后立即调用。
  //网络请求、事件订阅等操作可以在这个方法中调用。
  //作用相同与Fragment生命周期中的onViewCreate方法。
  componentDidMount(){
    this.getRequest(newsUrl);
  }

  getRequest (url) {
    /*网络请求的配置*/
    header.append('Authorization', appCode)
    const opts = {
      method: 'GET',
      headers: header
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

  //下拉刷新
  _onRefresh() {
    this.setState({refreshing: true});
    this.getRequest(newsUrl)
  }

  //列表点击事件
  itemClick(item, index) {
    // alert('新闻标题：' + item.author_name + '\n时间：' + item.date+'\n'+item.thumbnail_pic_s);
    this.props.navigation.navigate('Details', {
      title: item.title,
      url:item.url,
    })
  }

  //FlatList的key
  _keyExtractor = (item, index) => index.toString();

  //子item渲染
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.itemClick.bind(this, item, index)}>
        <View style={{backgroundColor:'#ffffff',padding:10,flexDirection:'row'}}>

          <Image source={{uri:item.thumbnail_pic_s02}}  style={styles.imgStyle}/>

          <View style={{flex:1,flexDirection:'column'}}>

          <Text style={{paddingRight:10,marginLeft:10,width:screenWidth*0.65,height:80*0.7}}>{item.title}</Text>

            <View style={{flexDirection:'row',alignItems:'center',paddingLeft:10,paddingRight:10}}>
              <Text style={styles.subTitle}>{item.author_name}</Text>
              <Text style={styles.subTitle}> {item.date}</Text>
            </View>
          </View>

        </View>

      </TouchableOpacity>
    );
  }
  //headerList
  /*ListHeaderComponent={this._headerView()}*/
  _headerView(){
    return (
      <View>
      <Text>{'reason:'+this.state.reason+'\ncode:'+this.state.error_code}</Text>
      <Text style={styles.text} onPress={() => {
      /* 1. Navigate to the Details route with params */
      this.props.navigation.navigate('Details', {
        itemId: 86,
        otherParam: 'First Details',
      })
    }}>新闻详情</Text>
    <Button title={'刷新列表'} style={styles.text} onPress={() => this.getRequest(newsUrl)}/>
      </View>
  )
  }

  //列表分割线
  _itemDivide = () => {
    return (
      <View style={{height: 10}}/>
    );
  }


  render () {

    return (
        <FlatList
          data={this.state.result.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._itemDivide}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />

    )

  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20
  },
  subTitle:{
   marginTop:10,
   color:'#666666',
    fontSize:12,
    flex:1
  },
  imgStyle:{
    width:screenWidth*0.3,
    height:80
  }
})
