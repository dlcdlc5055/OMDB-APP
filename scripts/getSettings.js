import AsyncStorage from '@react-native-async-storage/async-storage';
import settingsKey from "./settingsKey"

async function getSettings(setValue) {
    const defaultData = {
        darkMode: true,
    }
    const key = settingsKey
    let res = await AsyncStorage.getItem(key)
    if (res == undefined)
        await AsyncStorage.setItem(key, JSON.stringify(defaultData))
    res = JSON.parse(await AsyncStorage.getItem(key))
    if(setValue!=undefined)
        setValue(res)
    return res
}

export default getSettings