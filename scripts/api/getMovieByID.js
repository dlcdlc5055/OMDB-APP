import getAPIURL from "./getAPIURL";
import axios from "axios"

async function getMovieByID(id, isPlotFull) {
    let URL
    if (isPlotFull)
        URL = getAPIURL(["i", id], ["plot", "full"])
    else
        URL = getAPIURL(["i", id])
    let res = await axios(URL)
    return res.data
}

export default getMovieByID