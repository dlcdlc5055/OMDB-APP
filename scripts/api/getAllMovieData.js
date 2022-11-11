import InitLocalData from "../InitLocalData"
import getMovieByID from "./getMovieByID"

function uniteAllArr(...arrs){
    let res=[]
    for(let arr of arrs)
        for(let it of arr)
            res.push(it)
    return res
}

async function getAllMovieData(setMovieList,Selected){
    const dataFull = await InitLocalData()
    let res=[]
    let data=null
    if(Selected==0)
      data=dataFull.licked
    if(Selected==1)
      data=dataFull.downloaded
    if(Selected==2)
      data=dataFull.experienced 
    if(Selected==3)
      data=dataFull.bookmarked
    if(Selected==4)
        data=uniteAllArr(dataFull.licked,dataFull.downloaded,dataFull.experienced,dataFull.bookmarked)
    if(data==null)
      throw "invalid select in getAllMovieData"
    for(let it of data)
      res.push(await getMovieByID(it))
    setMovieList(res)
    return res
}

export default getAllMovieData