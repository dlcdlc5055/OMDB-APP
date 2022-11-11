import AsyncStorage from '@react-native-async-storage/async-storage';
import settingsKey from "./settingsKey"

async function setSettings(obj) {
    const key = settingsKey
    await AsyncStorage.setItem(key, JSON.stringify(obj))
}

export default setSettings