import { PermissionsAndroid } from 'react-native'

export default async function requestExternalWritePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cardio Jounal External Storage Write Permission',
        message: 'Cardio Jounal needs access to Storage data in your SD Card ',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //If WRITE_EXTERNAL_STORAGE Permission is granted
      //Calling the READ_EXTERNAL_STORAGE permission function
      return await requestExternalReadPermission()
    } else {
      alert('WRITE_EXTERNAL_STORAGE permission denied')
    }
  } catch (err) {
    alert('Write permission err', err)
    console.warn(err)
  }
}
async function requestExternalReadPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cardio Jounal needs Storage Read Permission',
        message: 'Cardio Jounal App needs access to your SD Card',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      alert('READ_EXTERNAL_STORAGE permission denied')
      return false
    }
  } catch (err) {
    alert('Read permission err', err)
    console.warn(err)
    return false
  }
}
