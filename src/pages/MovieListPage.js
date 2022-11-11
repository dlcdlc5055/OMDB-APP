import { View, Text ,ScrollView,Alert} from 'react-native'
import React, { useState } from 'react'
import TopNav from '../components/TopNav'
import {useDimensions} from "@react-native-community/hooks"
import MovieListItem from '../components/MovieListItem'
import InitLocalData from "../../scripts/InitLocalData"
import getMovieByID from '../../scripts/api/getMovieByID'
import MoviePage from "./MoviePage"
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../style/colors"
import getAllMovieData from '../../scripts/api/getAllMovieData'

function getTypeStr(type){
  if(type==0)
    return "licked"
  if(type==1)
    return "downloaded"
  if(type==2)
    return "experienced"
  if(type==3)
    return "bookmarked"
  throw "invalid select in getAllMovieData"
}

async function deleteItemID(type,id,setMovieList){
  let str=getTypeStr(type)
  let data =JSON.parse(await AsyncStorage.getItem(str))
  data=data.filter((it,i)=>it!==id)
  await AsyncStorage.setItem(str,JSON.stringify(data))
  setMovieList(null)
}

async function processClearAll(list,setMovieList){
  Alert.alert(
    'Delete Item',
    'Are you sure you want to delete all items?',
    [
      {
        text: 'no',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'yes', 
        onPress: async () => {
          let key=""
          if(list==0)
            key="licked"
          if(list==1)
            key="downloaded"
          if(list==2)
            key="experienced" 
          if(list==3)
            key="bookmarked"
          await AsyncStorage.setItem(key,"[]")
          setMovieList([])
        }
      },
    ],
    {cancelable: false},
  );
}

export default function MovieListPage({setSelected,Selected,DarkMode}) {
  const screenWidth=useDimensions().window.width
  const screenHeight=useDimensions().window.height
  const [MovieList,setMovieList]=useState(null)
  const [SelectedMovie,setSelectedMovie]=useState(null)
  const LocalColor=DarkMode?colors.dark:colors.light
  if(SelectedMovie!==null)
      return (<MoviePage DarkMode={DarkMode} overide={true} ID={SelectedMovie} setSelected={setSelectedMovie}/>)
  if(MovieList===null||MovieList.length==0){
    getAllMovieData(setMovieList,Selected)
    return (
      <View style={{width:screenWidth,height:screenHeight-55}}>
        <TopNav setSelected={setSelected} icon={"arrow-back"} DarkMode={DarkMode}/>
        <View style={{width:screenWidth,flex:1,alignItems:"center",padding:10}}>
          <Text style={{color:LocalColor.textColor,width:200,fontSize:30,paddingTop:0,textAlign:"center"}}>{MovieList===null?"Loading...":"No Items In This List!"}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={{width:screenWidth,height:screenHeight-55}} >
      <TopNav onClear={()=>{
         processClearAll(Selected,setMovieList)
      }} setSelected={setSelected} icon={"arrow-back"} DarkMode={DarkMode}/>
      <ScrollView style={{width:screenWidth,flex:1}}>
            {MovieList.map((it,i)=>(<MovieListItem  DarkMode={DarkMode} deleteItemID={(id)=>{deleteItemID(Selected,id,setMovieList)}} setSelected={setSelectedMovie} key={i} index={i} movie={it}/>))}
      </ScrollView>
    </View>
  )
} 