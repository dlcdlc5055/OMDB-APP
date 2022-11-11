import { useEffect, useState } from 'react';
import { View,SafeAreaView,Text,NativeModules,BackHandler} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import Navbar from './src/components/Navbar';
import SearchPage from './src/pages/SearchPage';
import HomePage from './src/pages/HomePage';
import SavedPage from './src/pages/SavedPage';
import SettingsPage from './src/pages/SettingsPage';
import InitLocalData from './scripts/InitLocalData';
import colors from "./style/colors"
import getSettings from "./scripts/getSettings"
import NetInfo from "@react-native-community/netinfo";
import NetworkErrorPage from './src/pages/NetworkErrorPage';
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

async function getIfDarkMode(setDarkMode){
  let settings=await getSettings()
  setDarkMode(settings.darkMode)
}

export default function App() {
  const [CurrentPage,setCurrentPage]=useState(0)
  const [DarkMode,setDarkMode]=useState(true)
  const [Connected,setConnected]=useState(false)
  BackHandler.addEventListener('hardwareBackPress', ()=>{return true});
  useEffect(()=>{
    InitLocalData()
    getIfDarkMode(setDarkMode)
  },[])
  NetInfo.addEventListener(state => {
    if(state.isConnected && Connected!==true)
      setConnected(true)
    if(!state.isConnected && Connected!==false)
      setConnected(false)
  });
  const screenWidth=useDimensions().window.width
  const LocalColor=DarkMode?colors.dark:colors.light
  if(Connected===false)
    return <SafeAreaView style={{flex:1,backgroundColor:LocalColor.gloalBackgroundcolor}}><NetworkErrorPage DarkMode={DarkMode}/></SafeAreaView>
  return (
    <SafeAreaView style={{flex:1,backgroundColor:LocalColor.gloalBackgroundcolor}}>
      <View style={{height:STATUSBAR_HEIGHT}}></View>
      <View style={{width:screenWidth,flex:1}}>
        {CurrentPage===3?<SettingsPage setDarkMode={setDarkMode} DarkMode={DarkMode}/>:<View style={{display:"none"}}></View>}
        {CurrentPage===2?<SavedPage DarkMode={DarkMode}/>:<View style={{display:"none"}}></View>}
        {CurrentPage===1?<SearchPage DarkMode={DarkMode}/>:<View style={{display:"none"}}></View>}
        {CurrentPage===0?<HomePage DarkMode={DarkMode}/>:<View style={{display:"none"}}></View>}
      </View>
      <View style={{height:55}}></View>
      <Navbar DarkMode={DarkMode} onPress={(id)=>{
        setCurrentPage(id)
      }}/>
    </SafeAreaView>
  );
}