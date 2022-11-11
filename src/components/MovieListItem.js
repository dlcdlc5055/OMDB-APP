import { View, Text,Alert ,Image,TouchableNativeFeedback} from 'react-native'
import React from 'react'
import {useDimensions} from "@react-native-community/hooks"
import { Icon } from 'react-native-elements'
import colors from "../../style/colors"
import { color } from 'react-native-elements/dist/helpers'

export default function MovieListItem({index,movie,setSelected,deleteItemID,DarkMode}) {
  const screenWidth=useDimensions().screen.width
  const Poster = movie.Poster
  const img_h=1.4833333333333334
  const img_w=90
  const Title=movie.Title
  const Released=movie.Released
  const Type=movie.Type
  const ID=movie.imdbID
  const LocalColor=DarkMode?colors.dark:colors.light
  const labelStyle={
    color:LocalColor.textColor,
    borderColor:LocalColor.borderColor,
    borderBottomWidth:1,
  }
  const valueStyle={
    color:LocalColor.textColor,
    borderColor:LocalColor.borderColor,
    textTransform:"capitalize"
  }
  if(!Poster.includes("https"))
    return <View></View>
  return (
    <View style={{width:screenWidth-20,padding:0,flexDirection:"row",backgroundColor:LocalColor.standardBackgroundcolor,borderRadius:5,margin:10,marginTop:index===0?10:0,overflow:"hidden"}}>
      <TouchableNativeFeedback onPress={()=>{setSelected(ID)}} style={{flex:1}}>
        <View style={{width:img_w,flex:1,flexDirection:"row"}}>
          <Image style={{margin:1,width:img_w,height:img_h*img_w,borderRadius:5,borderTopRightRadius:0,borderBottomRightRadius:0,borderWidth:0,borderColor:LocalColor.borderColor}} source={{uri:Poster}}/>
          <View style={{flex:1,height:img_h*img_w,paddingHorizontal:10,paddingRight:0,paddingVertical:6,marginRight:10,justifyContent:"space-between"}}>
            <View style={{flexDirection:"column"}}>
              <Text style={labelStyle}>Title</Text>
              <Text style={valueStyle}>{Title}</Text>
            </View>
            <View style={{flexDirection:"column"}}>
              <Text style={labelStyle}>Release Date</Text>
              <Text style={valueStyle}>{Released}</Text>
            </View>
            <View style={{flexDirection:"column"}}>
              <Text style={labelStyle}>Media Type</Text>
              <Text style={valueStyle}>{Type}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={async ()=>{
          Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
              {
                text: 'no',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'yes', 
                onPress: () => {
                  deleteItemID(ID)
                }
              },
            ],
            {cancelable: false},
          );
      }}>
        <View style={{height:img_h*img_w+2,borderBottomLeftRadius:0,borderTopLeftRadius:0,margin:0,padding:10,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:LocalColor.deleteBtnColor}}>
            <Icon name="delete" color={"#fff"}/>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
} 