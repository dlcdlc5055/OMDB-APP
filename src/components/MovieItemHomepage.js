import { View, Text ,Image,TouchableNativeFeedback} from 'react-native'
import React from 'react'
import colors from '../../style/colors'
import isPosterValid from "../../scripts/isPosterValid"

export default function MovieItemHomepage({item,index,size,setSelected,DarkMode}) {
    const h=1.4833333333333334
    const w=size
    const uri=item.Poster
    if(isPosterValid(uri))
        return <View></View>
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <View style={{marginLeft:index==0?0:10}}>
        <TouchableNativeFeedback onPress={()=>{setSelected(item.imdbID)}}>
            <Image style={{width:w,height:h*w,borderRadius:5,borderWidth:1,borderColor:LocalColor.borderColor+"5"}} source={{uri:uri}}/>
        </TouchableNativeFeedback> 
    </View>

  )
}