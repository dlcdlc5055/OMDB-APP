import { View, Text, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import {useDimensions} from "@react-native-community/hooks"
import ListSelector from '../components/ListSelector'
import MovieListPage from './MovieListPage'
import TitleItem from '../components/TitleItem'

export default function SavedPage({DarkMode}) {
  const [Selected,setSelected] = useState(null)
  const screenWidth=useDimensions().window.width
  const lists=["licked","downloaded","experienced","bookmarked"]
  if(Selected!=null)
    return <MovieListPage DarkMode={DarkMode} Selected={Selected} setSelected={setSelected}/>
  return (
    <View style={{width:screenWidth,flex:1}}>
        <View style={{width:screenWidth}}>
          <TitleItem text={"Saved Content"} DarkMode={DarkMode}/>
          {lists.map((it,i)=><ListSelector DarkMode={DarkMode} setSelected={setSelected} index={i} key={i} text={it}/>)}
        </View>
    </View>
  )
}