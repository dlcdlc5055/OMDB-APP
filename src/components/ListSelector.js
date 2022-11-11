import { View, Text, TouchableNativeFeedback } from 'react-native'
import {useDimensions} from "@react-native-community/hooks"
import React from 'react'
import { Icon} from 'react-native-elements'
import colors from "../../style/colors"

export default function ListSelector({text,index,setSelected,DarkMode}) {
  const screenWidth=useDimensions().window.width
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <TouchableNativeFeedback onPress={()=>{setSelected(index)}}>
        <View style={{width:screenWidth-20,marginHorizontal:10,padding:10,paddingVertical:7,marginBottom:10,backgroundColor:LocalColor.standardBackgroundcolor,marginTop:0,borderRadius:5,flexDirection:"row"}}>
            <View style={{justifyContent:"center",alignItems:"flex-start",flex:1}}>
                <Text style={{color:LocalColor.textColor,fontSize:20,textTransform:"capitalize"}}>{text}</Text>
            </View>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Icon name="chevron-right" size={30} color={LocalColor.textColor}/>
            </View>
        </View>
    </TouchableNativeFeedback>

  )
}