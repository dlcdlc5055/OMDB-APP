import { View, Text ,TouchableNativeFeedback, ScrollView} from 'react-native'
import React from 'react'
import { Icon} from 'react-native-elements'
import { useDimensions } from '@react-native-community/hooks'
import colors from "../../style/colors"

export default function TopNav({setSelected,icon,DarkMode,onClear}) {
  const screenWidth=useDimensions().window.width
  const LocalColor=DarkMode?colors.dark:colors.light
  const canClear=onClear!=undefined
  const btnWidth=55
  if(canClear)
    return (
      <View style={{width:screenWidth,height:50,backgroundColor:LocalColor.standardBackgroundcolor,paddingLeft:0,paddingRight:0,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:5,borderBottomColor:LocalColor.borderColor,borderBottomWidth:1}}>
          <View style={{flex:1,justifyContent:'space-between',flexDirection:"row",alignItems:"center"}}>
            <TouchableNativeFeedback style={{}} onPress={()=>{setSelected(null)}}>
                <View style={{width:btnWidth,height:50,justifyContent:"center",alignItems:"center"}}>
                  <Icon style={{width:btnWidth,height:40,justifyContent:"center",alignItems:"center"}} name={icon} color={LocalColor.textColor}/> 
                </View>
            </TouchableNativeFeedback>
            <View>
              <TouchableNativeFeedback onPress={()=>{onClear()}}>
                <View style={{height:50,backgroundColor:LocalColor.deleteBtnColor,paddingHorizontal:10,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:"#fff",fontSize:16}}>CLEAR ALL</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
      </View>
    )
  else
    return (
        <View style={{width:screenWidth,height:50,backgroundColor:LocalColor.standardBackgroundcolor,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:5,borderBottomColor:LocalColor.borderColor,borderBottomWidth:1,paddingLeft:0,paddingRight:0}}>
            <View style={{overflow:"hidden"}}>
              <TouchableNativeFeedback style={{}} onPress={()=>{setSelected(null)}}>
                  <View style={{width:btnWidth,height:50,justifyContent:"center",alignItems:"center",}}>
                    <Icon style={{width:btnWidth,height:40,justifyContent:"center",alignItems:"center"}} name={icon} color={LocalColor.textColor}/> 
                  </View>
              </TouchableNativeFeedback>
            </View>
        </View>
      )
}