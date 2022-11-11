import api_key from "../../data/key"

function getAPIURL(...arr) {
    let URL =`http://www.omdbapi.com/?apikey=${api_key}`
    for(it of arr)
        if(it!==null)
            URL += `&${it[0]}=${it[1]}`
    return URL
}

export default getAPIURL