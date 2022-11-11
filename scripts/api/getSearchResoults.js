import getAPIURL from "./getAPIURL";
import axios from "axios";

async function getSearchResults(query,year=null,type=null){
    let URL=getAPIURL(["s",query],year!==null?["y",year]:null,type!==null?["type",type]:null)
    let res=await axios(URL)
    return res.data
}

export default getSearchResults;