import { View, Text } from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks';
import colors from '../../style/colors';

export default function NetworkErrorPage({DarkMode}) {
    const screenWidth=useDimensions().window.width
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <View style={{width:screenWidth,flex:1,justifyContent:"center",alignItems:"center",padding:35,backgroundColor:LocalColor.deleteBtnColor}}>
        <Text style={{textAlign:"center",color:"#fff",fontSize:30}}>Please connect to the internet to use this App!</Text>
    </View>
  )
}
