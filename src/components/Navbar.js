import { View,TouchableNativeFeedback} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useDimensions } from '@react-native-community/hooks';
import { Icon } from 'react-native-elements'
import colors from "../../style/colors"


export default function Navbar({onPress,DarkMode}) {
  const LocalColor=DarkMode?colors.dark:colors.light
  const styles=StyleSheet.create({
    container: {
      position:"absolute",
      bottom:0,
      left:0,
      flexDirection:"row",
      borderTopWidth:1,
      borderTopColor:LocalColor.borderColor,
      backgroundColor:LocalColor.navBackgroundcolor,
    },
    item:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      height:55,
      backgroundColor:`${LocalColor.textColor}0`,
    },
  })
  return (
    <View style={[styles.container,{width:useDimensions().window.width}]}>
      <TouchableNativeFeedback onPress={()=>{onPress(0)}}><View style={styles.item}><Icon name='home' color={LocalColor.textColor}/></View></TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{onPress(1)}}><View style={styles.item}><Icon name='search' color={LocalColor.textColor}/></View></TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{onPress(2)}}><View style={styles.item}><Icon name='bookmarks' color={LocalColor.textColor}/></View></TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{onPress(3)}}><View style={styles.item}><Icon name='settings' color={LocalColor.textColor}/></View></TouchableNativeFeedback>
    </View>
  )
}

