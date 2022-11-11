import { View, Text,StyleSheet ,ScrollView,Image,TouchableNativeFeedback} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useDimensions } from '@react-native-community/hooks'
import { Icon} from 'react-native-elements'
import getMovieByID from '../../scripts/api/getMovieByID'
import MovieReviewDisplay from '../components/MovieReviewDisplay'
import MoviePageButtons from '../components/MoviePageButtons'
import TopNav from '../components/TopNav'
import colors from "../../style/colors"

async function getMovie(id,setMovieFull){
    let res = await getMovieByID(id,true)
    setMovieFull(res)
}

export default function MoviePage({setSelected,ID,overide,DarkMode}) {
    const screenWidth=useDimensions().window.width
    const [MovieFull,setMovieFull] = useState(null)
    const poseter_h=1.4833333333333334
    const poseter_w=120
    const h=useDimensions().window.height
    if(MovieFull==null){
        getMovie(ID,setMovieFull)
        return (<View></View>)
    }
    const LocalColor=DarkMode?colors.dark:colors.light
    const styles=StyleSheet.create({
        label:{
            color:LocalColor.textColor,
            borderBottomWidth:1,
            fontSize:18,
            borderBottomColor:LocalColor.borderColor   
        },
        dataText:{
            color:LocalColor.textColor,
        }
    })
    const Poster=MovieFull.Poster
    const Title=MovieFull.Title
    const Type=MovieFull.Type
    const Rated=MovieFull.Rated
    const Ratings=MovieFull.Ratings
    const movie=MovieFull 
    //todo fix game play icon
  return (
    <View style={{width:screenWidth,flex:1}}>
        <TopNav DarkMode={DarkMode} setSelected={setSelected} icon={"arrow-back"}/>
            <View style={{width:screenWidth,alignItems:"center",height:175,marginBottom:15,}}>
                <View style={{width:screenWidth-20,backgroundColor:LocalColor.standardBackgroundcolor,borderRadius:5,marginTop:10,padding:10,flexDirection:"row"}}>
                    <Image source={{uri:Poster}} style={{width:poseter_w,height:poseter_w*poseter_h,borderRadius:5,borderColor:LocalColor.borderColor,borderWidth:1}}/>
                    <View style={{flex:1,marginLeft:10,flexDirection:"column",justifyContent:"space-between",backgroundColor:LocalColor.secundaryBackgroundcolor,borderWidth:1,borderColor:"white",borderRadius:5,padding:5,paddingHorizontal:10}}>
                        <View>
                            <Text style={styles.label}>Title</Text>
                            <Text style={styles.dataText}>{Title}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Release Date</Text>
                            <Text style={styles.dataText}>{MovieFull.Released}</Text>      
                        </View>
                        <View>
                            <Text style={styles.label}>Type</Text>
                            <Text style={[styles.dataText,{textTransform:"capitalize"}]}>{Type}</Text>
                        </View>
                    </View>
                </View> 
            </View>
        <MoviePageButtons DarkMode={DarkMode} movie={movie}/>
        <ScrollView style={{height:h-20,width:screenWidth,marginTop:5}}>
            <View style={{width:screenWidth-20,marginHorizontal:10,marginTop:0,paddingHorizontal:10,backgroundColor:LocalColor.secundaryBackgroundcolor,borderColor:LocalColor.borderColor,borderWidth:1,borderRadius:5}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",}}>
                    <View style={{marginBottom:6,flex:1,marginRight:10}}>
                        <Text style={[styles.label]}>Runtime</Text>
                        <Text style={[styles.dataText]}>{MovieFull.Runtime}</Text> 
                    </View>
                    <View style={{marginBottom:6,flex:1}}>
                        <Text style={[styles.label]}>Genre</Text>
                        <Text style={[styles.dataText]}>{MovieFull.Genre}</Text> 
                    </View>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",}}>
                    <View style={{marginBottom:6,flex:1,marginRight:10}}>
                        <Text style={[styles.label]}>Language</Text>
                        <Text style={[styles.dataText]}>{MovieFull.Language}</Text> 
                    </View>
                    <View style={{marginBottom:6,flex:1}}>
                        <Text style={[styles.label]}>Country</Text>
                        <Text style={[styles.dataText]}>{MovieFull.Country}</Text> 
                    </View>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",}}>
                    <View style={{marginBottom:6,flex:1,marginRight:10}}>
                        <Text style={[styles.label]}>Awards</Text>
                        <Text style={[styles.dataText]}>{MovieFull.Awards}</Text> 
                    </View>
                    <View style={{marginBottom:6,flex:1}}>
                        <Text style={[styles.label]}>Actors</Text>
                        <Text style={[styles.dataText]}>{MovieFull.Actors}</Text> 
                    </View>
                </View>
                <View style={{marginBottom:6}}>
                    <Text style={[styles.label]}>Description</Text>
                    <Text style={[styles.dataText]}>{MovieFull.Plot}</Text> 
                </View>
            </View>
            
            <View style={{display:Ratings==undefined?"none":"flex",marginHorizontal:10,width:screenWidth-20,backgroundColor:LocalColor.secundaryBackgroundcolor,borderColor:LocalColor.borderColor,borderWidth:1,borderRadius:5,marginTop:10,padding:10,paddingVertical:0}}>
                {Ratings.map((rating,i)=><MovieReviewDisplay DarkMode={DarkMode} index={i} key={i} rating={rating}/>)}
            </View>
            <View style={{height:10}}></View>
        </ScrollView>
    </View>
  ) 
}
