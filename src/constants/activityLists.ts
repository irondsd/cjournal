import { activityTypes } from './activityTypes'

export const pillsList = [
    activityTypes.MedicineTest,
    activityTypes.ReliefOfAttack,
    activityTypes.CourseTherapy,
]

export const prescriptions = {
    [activityTypes.CourseTherapy]: 'course_therapy',
    [activityTypes.ReliefOfAttack]: 'relief_of_attack',
    [activityTypes.MedicineTest]: 'tests',
}

export const bloodPressureList = [
    activityTypes.Press,
    activityTypes.ActiveOrthostasis,
]

export const othersList = [
    activityTypes.OtherActivity,
    activityTypes.OtherComplaints,
    activityTypes.OtherLoad,
    activityTypes.OtherPain,
    activityTypes.OtherWeakness,
    activityTypes.OtherEmotions,
]
