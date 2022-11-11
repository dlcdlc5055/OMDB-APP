import { View, Text,Image ,TouchableNativeFeedback} from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'
import colors from "../../style/colors"
import isPosterValid from "../../scripts/isPosterValid"

export default function MovieItem({movie,id,max_id,setSelected,DarkMode}) {
    const Poster=movie.Poster
    const Year=movie.Year
    const Title=movie.Title
    const Type=movie.Type
    const h=1.4833333333333334
    const size= useDimensions().window.width/2-20
    if(isPosterValid(Poster))
        return <View></View>
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <View style={{marginBottom:10,marginTop:id<2?10:0,marginRight:id%2==1?0:15}}>
        <TouchableNativeFeedback onPress={()=>{
            setSelected(movie)
        }} style={{}}>
            <View style={{
                borderRadius:5,width:size,height:size*h,overflow:"hidden",backgroundColor:'#fff',borderColor:LocalColor.borderColor+"5",borderWidth:1
            }}>
                <Image source={{uri:Poster}} style={{width:size,height:size*h,position:"relative",top:0,left:0}}/>
                <View>
                    
                </View>
            </View>
        </TouchableNativeFeedback>
    </View>
  )
}