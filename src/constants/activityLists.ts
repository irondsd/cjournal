import { ActivityTypes } from './ActivityTypes'

export const pillsList = [
    ActivityTypes.MedicineTest,
    ActivityTypes.ReliefOfAttack,
    ActivityTypes.CourseTherapy,
]

export const bloodPressureList = [
    ActivityTypes.Press,
    ActivityTypes.ActiveOrthostasis,
]

export const othersList = [
    ActivityTypes.OtherActivity,
    ActivityTypes.OtherComplaints,
    ActivityTypes.OtherLoad,
    ActivityTypes.OtherPain,
    ActivityTypes.OtherWeakness,
    ActivityTypes.OtherEmotions,
]

type IndexType =
    | ActivityTypes.CourseTherapy
    | ActivityTypes.ReliefOfAttack
    | ActivityTypes.MedicineTest

export const prescriptions: {
    [index in IndexType]: string
} = {
    [ActivityTypes.CourseTherapy]: 'course_therapy',
    [ActivityTypes.ReliefOfAttack]: 'relief_of_attack',
    [ActivityTypes.MedicineTest]: 'tests',
}
