import React, { Suspense, lazy, Component } from 'react';
import { View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity,Text } from "react-native";
import axios from "axios";

const Albums = lazy(() => import('./Album/Album'));


export default class Itunes_Demo_Abhishek extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      text: '',
      toggle:false
    };
    this.arrayholder = [];
    this.sorting = [];
  }


  componentDidMount() {
    axios
      .get(`https://itunes.apple.com/in/rss/topalbums/limit=100/json`)
      .then(res => {
        this.setState({ posts: res.data.feed.entry });
        this.arrayholder = res.data.feed.entry
        this.sorting = res.data.feed.entry
      })
      .catch(error => console.log(error))
  }


  /*************************Search-Functionality**************************/
  handleSearch(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.title.label ? item.title.label.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      posts: newData,
      text: text,
    });
  }
  /*********************************************************************/



  /***************************Sorting-Functionality************************************/
  sortFunctionIncreasingPrice = () => {
    const sorted = this.sorting.map(e => {
      e["im:price"].attributes.amount = parseFloat(e["im:price"].attributes.amount)
    })
    let sorted_data = this.sorting.sort((a,b) =>a["im:price"].attributes.amount - b["im:price"].attributes.amount)
    this.setState({
      posts: sorted_data,
    })
  }


  sortFunctionDecreasingPrice =()=>{
    const sorted = this.sorting.map(e => {
      e["im:price"].attributes.amount = parseFloat(e["im:price"].attributes.amount)
    })
    let sorted_data = this.sorting.sort((a,b) =>b["im:price"].attributes.amount - a["im:price"].attributes.amount)
    this.setState({
      posts: sorted_data,
    })
  }

  sortFunctionIncreasingDate =()=>{
    let sorted_data = this.sorting.sort((a,b)=>new Date(a["im:releaseDate"].attributes.label)-new Date(b["im:releaseDate"].attributes.label))
    this.setState({
      posts: sorted_data,
    })
  }

  sortFunctionDecreasingDate =()=>{
    let sorted_data = this.sorting.sort((a,b)=>new Date(b["im:releaseDate"].attributes.label)-new Date(a["im:releaseDate"].attributes.label))
    this.setState({
      posts: sorted_data,
    })
  }

  sortFunctionIncreasingName =()=>{
    let sorted_data = this.sorting.sort((a,b)=>a["im:artist"].label>b["im:artist"].label)
    this.setState({
      posts: sorted_data,
    })
  }


  sortFunctionDecreasingName =()=>{
    let sorted_data = this.sorting.sort((a,b)=>b["im:artist"].label>a["im:artist"].label)
    this.setState({
      posts: sorted_data,
    })
  }
/************************************************************************************/



  render() {

    /************************Fallback-Image*******************************/
    const loadingImg = <View>
      <Image alt="loading" source="https://google.com" />
    </View>
    /**********************************************************************/



    /****************Albums************************/
    const albums = this.state.posts.map(e => {
      return (
        <Suspense key={e.id.label} fallback={loadingImg}>
          <Albums
            image={e["im:image"][2].label}
            title={e.title.label}
            link={e.id.label}
            price={e["im:price"].label}
            date={e["im:releaseDate"].label}
          />
        </Suspense>
      );
    });
    /***********************************************/


    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.handleSearch(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.sortFunctionIncreasingPrice}>
              <Image source={require("./asset/up.png")} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'lavender', width: 70, padding: 1, borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', padding: 5,fontWeight:'bold' }}>Price</Text>
            </View>
            <TouchableOpacity onPress={this.sortFunctionDecreasingPrice}>
              <Image source={require("./asset/down.png")} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.sortFunctionIncreasingDate}>
              <Image source={require("./asset/up.png")} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'lavender', width: 70, padding: 1, borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', padding: 5,fontWeight:'bold' }}>Date</Text>
            </View>
            <TouchableOpacity onPress={this.sortFunctionDecreasingDate}>
              <Image source={require("./asset/down.png")} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.sortFunctionIncreasingName}>
              <Image source={require("./asset/up.png")} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'lavender', width: 70, padding: 1, borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', padding: 5,fontWeight:'bold'}}>Artist</Text>
            </View>
            <TouchableOpacity onPress={this.sortFunctionDecreasingName}>
              <Image source={require("./asset/down.png")} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{margin:10}}>
          {albums}
        </ScrollView>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  textInputStyle: {
    margin:30,
    height: 50,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    borderRadius:25,
    paddingLeft:20
  },


  button: {
    width: '30%',
    height: 20,
    backgroundColor: 'grey',
    margin: 10
  }

});