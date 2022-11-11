import { View,Text,Switch} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useDimensions } from '@react-native-community/hooks'
import colors from "../../style/colors"
import ToggleSwitch from 'toggle-switch-react-native'
import TitleItem from '../components/TitleItem'
import getSettings from "../../scripts/getSettings"
import setSettings from "../../scripts/setSetting"

async function processToggle(value){
  let settings=await getSettings()
  settings.darkMode=value
  await setSettings(settings)
}

async function getInitialToggleStatus(setValue){
  let settings=await getSettings()
  setValue(settings.darkMode)
}

export default function SettingsPage({DarkMode,setDarkMode}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const screenWidth=useDimensions().window.width
  useEffect(()=>{
    getInitialToggleStatus(setIsEnabled)
  },[])
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <View style={{width:screenWidth,flex:1}}>
      <TitleItem text={"Settings"} DarkMode={DarkMode}/>
      <View style={{width:screenWidth-20,justifyContent:"center",marginHorizontal:10,padding:10,paddingVertical:7,marginBottom:10,paddingVertical:8,backgroundColor:LocalColor.standardBackgroundcolor,borderRadius:5,flexDirection:"row"}}>
        <View style={{flex:1,justifyContent:"center"}}>
          <Text style={{color:LocalColor.textColor,fontSize:26}}>Dark Theme</Text>
        </View>
        <View>
        <ToggleSwitch
          onToggle={()=>{{setIsEnabled(!isEnabled);processToggle(!isEnabled);setDarkMode(!isEnabled)}}}
          isOn={isEnabled}
          onColor="#44c22e"
          offColor={LocalColor.deleteBtnColor}
          thumbOnStyle={ThumbStyle}
          thumbOffStyle={ThumbStyle}
          trackOnStyle={trackStyle}
          trackOffStyle={trackStyle}
          label=""
          size="large"
        />
        </View>
      </View>
    </View>
  )
}

const trackStyle = {borderWidth:1,borderColor:"#1118"}
const ThumbStyle={backgroundColor:"#fff",borderWidth:1,borderColor:"#1118"}