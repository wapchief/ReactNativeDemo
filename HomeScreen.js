/* 首页 */
import React,{Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl, ActivityIndicator
} from 'react-native'
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions'
import Toast from 'react-native-root-toast'
const screenWidth = Dimensions.get('window').width;
const urlBanner = 'http://www.wanandroid.com/banner/json'
let pageNo = 0;//当前第几页
let itemNo = 0;
export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShow:false,
      //下拉刷新
      refreshing: false,
      //加载更多
      isLoading: true,
      dataArray: [],
      // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      showFoot: '1',
      data:'',
      items:[],
      urls:[],
      //列表数据
      dataList:'',
      //总页数
      pageCount:0
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        isShow: true,
      })
      this.getRequest(urlBanner)
      this.getRequestList(0)
    },0)
  }

  //列表点击事件
  itemClick(item, index) {
    // alert('新闻标题：' + item.author_name + '\n时间：' + item.date+'\n'+item.thumbnail_pic_s);
    this.props.navigation.navigate('Details', {
      title: index,
      url:this.state.urls[index],
    })
    // alert(this.state.items[0]+',index:'+index)
  }

  //banner点击
  bannerItemClick(item, index) {
    this.props.navigation.navigate('Details', {
      url:this.state.urls[index],
    })
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
            onPress={this.bannerItemClick.bind(this, item, index)}>
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

  /*轮播*/
  _headerBannerView(){
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

        </ScrollView>
      )}else {
      return (
        <View style={styles.imgView}>
          <Image source={ require('./res/drawable/head_other.png')} style={styles.bannerImg} />
        </View>
      )
    }
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
          data:responseJson.datas,
        });
        // alert(this.state.data[0].imagePath)
        this.addMap(responseJson.data)
      })
      .catch((error) => {
        alert(error)
      })
  }


  /*加载列表数据*/
  getRequestList(pagerNo){
    const opts = {
      method: 'GET',
    }
    fetch('http://www.wanandroid.com/article/list/'+pagerNo+'/json', opts)
      .then((response) => {
        this.setState({refreshing: false});
        return response.json();
      })
      .then((responseJson) => {
        let data = responseJson.data.datas;
        let dataBlob = [];
        let i = itemNo;

        data.map(function (item) {
          dataBlob.push({
            key: i,
            value: item,
          })
          i++;
        });
        let foot = 0;
        if(pageNo>=responseJson.data.pageCount){
          //listView底部显示没有更多数据了
          foot = 1;
        }

        this.setState({
          dataList: responseJson.data.datas,
          dataArray:this.state.dataArray.concat(dataBlob),
          refreshing: false,
          isLoading:false,
          showFoot:foot,
          pageCount:responseJson.data.pageCount,
        });
        //必须置空否则重复添加
        data = null;
        dataBlob = null;
        // alert(this.state.dataList[0].title)
      })
      .catch((error) => {
        alert(error)
      })
  }

  //下拉刷新
  _onRefresh () {
    this.setState({refreshing: true})
    this.getRequestList(0)
  }

  //上拉加载更多
  _renderFooter(){
    if (this.state.showFoot === 1) {
      return (
        <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
          <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if(this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载数据...</Text>
        </View>
      );
    } else if(this.state.showFoot === 0){
      return (
        <View style={styles.footer}>
        </View>
      );
    }else {
      return(
        <Text/>
      )
    }
  }

  _onEndReached(){
    //如果是正在加载中或没有更多数据了，则返回
    if(this.state.showFoot !== 0 ){
      return ;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if((pageNo!==1) && (pageNo>=this.state.pageCount)){
      return;
    } else {
      pageNo++;
    }
    //底部显示正在加载更多数据
    this.setState({showFoot:2});
    //获取数据
    this.getRequestList(pageNo);
  }


  //列表点击事件
  itemClick (item, index) {
    // alert('新闻标题：' + item.author_name + '\n时间：' + item.date+'\n'+item.thumbnail_pic_s);
    this.props.navigation.navigate('Details', {
      title: item.value.title,
      url: item.value.link,
    })
  }
  //列表分割线
  _itemDivide = () => {
    return (
      <View style={{height: 10}}/>
    )
  }
  //FlatList的key
  _keyExtractor = (item, index) => index.toString()

  //子item渲染
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.itemClick.bind(this, item, index)}>
        <View style={{backgroundColor: '#ffffff', padding: 10, flexDirection: 'column'}}>

            <Text style={{
              marginRight: 10,
              marginLeft: 10,
              width: screenWidth-20,
            }}>{item.value.title}</Text>

            <View style={{flex: 1,flexDirection: 'row', paddingLeft: 10, paddingRight: 10,marginTop:10}}>
              <Text style={{
                width:screenWidth-100,
                marginTop:10,
                color:'#666666',
                fontSize:12}}>{item.value.chapterName}</Text>
              <Text style={styles.subTitle}> {item.value.niceDate}</Text>
            </View>

        </View>

      </TouchableOpacity>
    )
  }

  render() {
    return(
      <FlatList
        data={this.state.dataArray}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListHeaderComponent={this._headerBannerView()}
        ItemSeparatorComponent={this._itemDivide}
        ListFooterComponent={this._renderFooter.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={1}
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
  },
  imgStyles: {
    width: screenWidth * 0.3,
    height: 80
  },
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  },

})
