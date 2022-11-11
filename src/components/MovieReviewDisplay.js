import { View, Text} from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'
import colors from "../../style/colors"

function getRatingColor(value){
    let rating=null
    if(value.includes("%"))
        rating=parseInt(value.split("%")[0])
    else if(value.includes("/"))
        rating=Math.floor((parseInt(value.split("/")[0])/parseInt(value.split("/")[1]))*100)
    else
        throw "invalid rating value"
    if(rating>75)
        return "#2fa32a"
    else if(rating>50)
        return "#c8bb1c"
    else
        return "#901010"
}

function getRateingValue(value){
    if(value.includes("%"))
        return  Math.floor(parseInt(value.split("%")[0]))/10
    else if(value.includes("/"))
        return  Math.floor((parseInt(value.split("/")[0])/parseInt(value.split("/")[1]))*100)/10
    else
        throw "invalid rating value"
}

export default function MovieReviewDisplay({rating,index,DarkMode}) {
    const screenWidth=useDimensions().window.width
    const value=rating.Value
    const color=getRatingColor(value)
    let source=rating.Source
    if(source==="Internet Movie Database")
        source="IMDB"
    const h=62
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <View style={{flexDirection:"row",height:h,width:screenWidth-40,alignItems:"center",borderColor:LocalColor.borderColor,borderTopWidth:index==0?0:1}}>
        <View style={{flex:1}}>
            <Text style={{color:LocalColor.textColor,fontSize:22}}>{source}</Text>
        </View>
        <View style={{height:h-20,width:h-20,backgroundColor:color,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:LocalColor.textColor,fontSize:18}}>{getRateingValue(value)}</Text>
        </View>
    </View>
  )
}