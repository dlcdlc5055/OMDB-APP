import { View, Text ,Image,TouchableNativeFeedback,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDimensions } from '@react-native-community/hooks'
import getSearchResults from "../../scripts/api/getSearchResoults"
import MovieItemHomepage from "./MovieItemHomepage"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecomandedShowcase({data,index,setSelected,DarkMode,Items}) {
    const screenWidth=useDimensions().window.width
    const h=1.4833333333333334
    const w=100
    if(Items==null)
        return <View></View>
    return (
        <ScrollView horizontal={true} style={{width:screenWidth-20,height:w*h,flexDirection:"row",marginTop:0,marginVertical:5}}>
            {Items.map((item,i)=><MovieItemHomepage DarkMode={DarkMode} setSelected={setSelected} index={i} item={item} key={i} size={w}/>)}
        </ScrollView> 
    )
} 