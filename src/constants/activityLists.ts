import { activityTypes } from './activityTypes'

export const pillsList: Array<keyof typeof activityTypes> = [
    activityTypes.MedicineTest,
    activityTypes.ReliefOfAttack,
    activityTypes.CourseTherapy,
]

export const prescriptions: { [index: string]: any } = {
    [activityTypes.CourseTherapy]: 'course_therapy',
    [activityTypes.ReliefOfAttack]: 'relief_of_attack',
    [activityTypes.MedicineTest]: 'tests',
}

export const bloodPressureList: Array<keyof typeof activityTypes> = [
    activityTypes.Press,
    activityTypes.ActiveOrthostasis,
]

export const othersList: Array<keyof typeof activityTypes> = [
    activityTypes.OtherActivity,
    activityTypes.OtherComplaints,
    activityTypes.OtherLoad,
    activityTypes.OtherPain,
    activityTypes.OtherWeakness,
    activityTypes.OtherEmotions,
]
