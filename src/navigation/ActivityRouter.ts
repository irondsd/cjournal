import { ActivityTypes } from '../constants'
import { Routes } from '../navigation/Routes'

export const ActivityRouter = (activity_type: ActivityTypes): Routes => {
    switch (activity_type) {
        case ActivityTypes.WalkingTest:
            return Routes.WalkingTest
        case ActivityTypes.Stairs:
            return Routes.Stairs
        case ActivityTypes.CourseTherapy:
            return Routes.Pills
        case ActivityTypes.ReliefOfAttack:
            return Routes.Pills
        case ActivityTypes.MedicineTest:
            return Routes.Pills
        case ActivityTypes.ActiveOrthostasis:
            return Routes.BloodPressure
        case ActivityTypes.Press:
            return Routes.BloodPressure
        case ActivityTypes.VerticalPositionCalibration:
            return Routes.Other
        case ActivityTypes.OtherActivity:
            return Routes.Other
        case ActivityTypes.OtherComplaints:
            return Routes.Other
        case ActivityTypes.OtherEmotions:
            return Routes.Other
        case ActivityTypes.OtherLoad:
            return Routes.Other
        case ActivityTypes.OtherPain:
            return Routes.Other
        case ActivityTypes.OtherWeakness:
            return Routes.Other
        case ActivityTypes.Trainer:
            return Routes.Other

        case ActivityTypes.PhysicalLoad:
            return Routes.PhysicalLoad
        case ActivityTypes.Activity:
            return Routes.Activity
        case ActivityTypes.EmotionalStress:
            return Routes.EmotionalStress
        case ActivityTypes.Pain:
            return Routes.Pain
        case ActivityTypes.Complaints:
            return Routes.Complaints
        case ActivityTypes.Weakness:
            return Routes.Weakness
        case ActivityTypes.TakingMedicine:
            return Routes.TakingMedicine
        case ActivityTypes.Tests:
            return Routes.Tests
        case ActivityTypes.Service:
            return Routes.Service
        default:
            return Routes.TimePick
    }
}
