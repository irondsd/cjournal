import LocalizedStrings from 'react-native-localization'
import { en } from './en'
import { ru } from './ru'
import { es } from './es'

export type Strings = keyof typeof en

export const strings: { [key in Strings]: string } = new LocalizedStrings({
    en: en,
    es: es,
    ru: ru,
})
