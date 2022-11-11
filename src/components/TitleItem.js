import { View, Text } from 'react-native'
import React from 'react'
import colors from "../../style/colors"

export default function TitleItem({text,overide,size,DarkMode}) {
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
      <Text style={{color:LocalColor.textColor,borderBottomColor:LocalColor.borderColor,borderBottomWidth:2,margin:overide?0:10,marginBottom:10,fontSize:size==undefined?24:size,paddingBottom:2}}>{text}</Text>
  )
}