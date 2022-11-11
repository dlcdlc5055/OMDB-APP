import AsyncStorage from '@react-native-async-storage/async-storage';

async function InitLocalData(forced) {
    let licked = await AsyncStorage.getItem("licked")
    let dislicked = await AsyncStorage.getItem("dislicked")
    let downloaded = await AsyncStorage.getItem("downloaded")
    let experienced = await AsyncStorage.getItem("experienced")
    let bookmarked = await AsyncStorage.getItem("bookmarked")
    if (licked == undefined || forced)
        await AsyncStorage.setItem("licked", "[]")
    if (dislicked == undefined || forced)
        await AsyncStorage.setItem("dislicked", "[]")
    if (downloaded == undefined || forced)
        await AsyncStorage.setItem("downloaded", "[]")
    if (experienced == undefined || forced)
        await AsyncStorage.setItem("experienced", "[]")
    if (bookmarked == undefined || forced)
        await AsyncStorage.setItem("bookmarked", "[]")
    licked = await AsyncStorage.getItem("licked")
    dislicked = await AsyncStorage.getItem("dislicked")
    downloaded = await AsyncStorage.getItem("downloaded")
    experienced = await AsyncStorage.getItem("experienced")
    bookmarked = await AsyncStorage.getItem("bookmarked")
    const obj = {}
    obj.licked = JSON.parse(licked)
    obj.dislicked = JSON.parse(dislicked)
    obj.downloaded = JSON.parse(downloaded)
    obj.experienced = JSON.parse(experienced)
    obj.bookmarked = JSON.parse(bookmarked)
    return obj
}

export default InitLocalData;