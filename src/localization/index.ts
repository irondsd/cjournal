import LocalizedStrings from 'react-native-localization'
import { en } from './en'
import { ru } from './ru'
import { es } from './es'

type IndexType = keyof typeof en

export const strings: { [key in IndexType]: string } = new LocalizedStrings({
    en: en,
    es: es,
    ru: ru,
})
