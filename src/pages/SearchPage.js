import { View,TextInput ,Text,ScrollView,FlatList} from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'
import getSearchResults from '../../scripts/api/getSearchResoults'
import { useState ,useEffect} from 'react'
import MovieItem from '../components/MovieItem'
import MoviePage from './MoviePage'
import colors from "../../style/colors"

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

export default function SearchPage({DarkMode}) {
    const [Page,setPage]=useState(0)
    const [Input,setInput]=useState("")
    const [MoviesList,setMoviesList]=useState([])
    const [Selected,setSelected]=useState(null)
    const screenWidth=useDimensions().window.width
    const LocalColor=DarkMode?colors.dark:colors.light
    if(Selected!==null)
        return(<MoviePage DarkMode={DarkMode} ID={Selected.imdbID} setSelected={setSelected}/>)
    return (
        <View style={{width:screenWidth,flex:1}}>
            <View style={{width:screenWidth,padding:10,paddingVertical:15,paddingBottom:10,borderBottomWidth:1,borderBottomColor:LocalColor.borderColor}}>
                <TextInput placeholder='Search For Entertaimment' onChangeText={(text)=>{
                    setInput(text)
                    const func=async ()=>{
                        setMoviesList(null)
                        const res=await getSearchResults(text)
                        try{
                            if(res.Search!=undefined)
                                setMoviesList(res.Search)
                            else
                                setMoviesList([])
                        }catch(e){
                            setMoviesList([])
                        }
                    }
                    func()
                }} value={Input} style={{width:screenWidth-20,height:50,backgroundColor:LocalColor.gloalBackgroundcolor,color:LocalColor.textColor,borderRadius:5,paddingHorizontal:10,fontSize:20,borderColor:LocalColor.borderColor,borderWidth:4}}/>
            </View>
            <View style={{flex:1,width:screenWidth,padding:10,paddingVertical:0,paddingTop:0}}>
                {MoviesList==null||MoviesList.length===0?<View style={{flex:1,width:screenWidth,alignItems:"center"}}><Text style={{color:LocalColor.textColor,width:300,fontSize:30,paddingTop:20,textAlign:"center"}}>{isBlank(Input)?"":"No Resoults Found!"}</Text></View>:<ScrollView style={{flex:1,width:screenWidth-10,borderRadius:5}}>
                    <View style={{flexDirection:"row",paddingHorizontal:5,flexWrap:"wrap"}}>
                        {MoviesList.map((movie,i)=>(<MovieItem DarkMode={DarkMode} setSelected={setSelected} max_id={MoviesList.length} id={i} key={i} movie={movie}/>))} 
                    </View>
                </ScrollView>}
            </View>
        </View> 
    ) 
} 
