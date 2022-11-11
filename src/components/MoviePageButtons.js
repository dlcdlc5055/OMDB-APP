import { View, Text,TouchableNativeFeedback } from 'react-native'
import { Icon} from 'react-native-elements'
import { useDimensions } from '@react-native-community/hooks'
import React, { useEffect, useState } from 'react'
import InitLocalData from "../../scripts/InitLocalData"
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../style/colors"

async function process(key,id,setState){
    const allData=await InitLocalData()
    let data=JSON.parse(await AsyncStorage.getItem(key))
    if(!data.includes(id))
        data.push(id)
    else{
        data=data.filter((value,i)=>value!=id)
 
    }
    if(key==="licked" && data.includes(id)){
        allData.dislicked=allData.dislicked.filter((value,i)=>value!=id)
        AsyncStorage.setItem("dislicked",JSON.stringify(allData.dislicked))
    }else if(key==="dislicked" && data.includes(id)){
        allData.licked=allData.licked.filter((value,i)=>value!=id)
        AsyncStorage.setItem("licked",JSON.stringify(allData.licked))
    }
    await AsyncStorage.setItem(key,JSON.stringify(data))
    await InitLocalState(setState,id)
}

async function InitLocalState(setState,id,DarkMode){
    const state=[false,false,false,false,false]
    const data=await InitLocalData()
    state[0]=data.licked.includes(id)
    state[1]=data.dislicked.includes(id)
    state[2]=data.experienced.includes(id)
    state[3]=data.downloaded.includes(id)
    state[4]=data.bookmarked.includes(id)
    setState(state)
}

export default function MoviePageButtons({movie,DarkMode}) {
    const [State,setState] = useState([false,false,false,false,false])
    const Type=movie.Type
    const screenWidth=useDimensions().window.width
    const ID=movie.imdbID
    const LocalColor=DarkMode?colors.dark:colors.light
    useEffect(()=>{
        InitLocalState(setState,ID)
    },[])
  return (
    <View style={{width:screenWidth-20,marginHorizontal:10,marginBottom:5,height:40,backgroundColor:LocalColor.standardBackgroundcolor,marginTop:28,borderRadius:5,flexDirection:"row",}}>
        <TouchableNativeFeedback onPress={()=>{process("licked",ID,setState)}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Icon style={{flex:1,height:40,justifyContent:"center",alignItems:"center"}} name='thumb-up'  color={State[0]?LocalColor.likeColor:LocalColor.textColor}/>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={()=>{process("dislicked",ID,setState)}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Icon style={{flex:1,height:40,justifyContent:"center",alignItems:"center"}} name='thumb-down'  color={State[1]?LocalColor.dislikeColor:LocalColor.textColor}/>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback  onPress={()=>{process("experienced",ID,setState)}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Icon style={{flex:1,height:40,justifyContent:"center",alignItems:"center"}} name={Type==="game"?State[2]?'play-arrow':"play-disabled":State[2]?'visibility':'visibility-off'}  color={LocalColor.textColor}/>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={()=>{process("downloaded",ID,setState)}} >
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Icon style={{flex:1,height:40,justifyContent:"center",alignItems:"center"}} name={State[3]?'file-download-done':'file-download'}  color={LocalColor.textColor}/>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={()=>{process("bookmarked",ID,setState)}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Icon style={{flex:1,height:40,justifyContent:"center",alignItems:"center"}} name={State[4]?'turned-in':'turned-in-not'}  color={LocalColor.textColor}/>
            </View>
        </TouchableNativeFeedback>
    </View>
  )
}