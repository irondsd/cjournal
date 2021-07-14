import { ActivityTypes } from '../constants'

export enum Routes {
    TimePick = 'TimePick',
    WalkingTest = 'WalkingTest',
    TakingMedicine = 'TakingMedicine',
    Stairs = 'Stairs',
    Pills = 'Pills',
    Other = 'Other',
    Trainer = 'Trainer',
    BloodPressure = 'BloodPressure',
}

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
            return Routes.Trainer

        default:
            return Routes.TimePick
    }
}
