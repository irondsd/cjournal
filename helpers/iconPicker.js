import { activityTypes } from '../constants'

export function iconPicker(activity_type) {
    let img

    switch (activity_type) {
        case activityTypes.Sleep:
            img = require('../resources/squareIcons/sleep.png')
            break
        case activityTypes.Stairs:
            img = require('../resources/squareIcons/stairs.png')
            break
        case activityTypes.Walking:
            img = require('../resources/squareIcons/6minwalking.png')
            break
        case activityTypes.Trainer:
            img = require('../resources/squareIcons/trainer.png')
            break
        case activityTypes.Shower:
            img = require('../resources/squareIcons/shower.png')
            break
        case activityTypes.OtherLoad:
            img = require('../resources/squareIcons/physicalload.png')
            break
        case activityTypes.OtherActivity:
            img = require('../resources/squareIcons/activity.png')
            break
        case activityTypes.OtherEmotions:
            img = require('../resources/squareIcons/otheremotions.png')
            break
        case activityTypes.OtherPain:
            img = require('../resources/squareIcons/otherpain.png')
            break
        case activityTypes.OtherComplaints:
            img = require('../resources/squareIcons/complaints.png')
            break
        case activityTypes.OtherWeakness:
            img = require('../resources/squareIcons/negativeemotions.png')
            break
        case activityTypes.Activity:
            img = require('../resources/squareIcons/activity.png')
            break
        case activityTypes.Service:
            img = require('../resources/squareIcons/service.png')
            break
        case activityTypes.Meal:
            img = require('../resources/squareIcons/meal.png')
            break
        case activityTypes.Alcohol:
            img = require('../resources/squareIcons/alcohol.png')
            break
        case activityTypes.Smoking:
            img = require('../resources/squareIcons/smoking.png')
            break
        case activityTypes.CourseTherapy:
            img = require('../resources/squareIcons/coursetherapy.png')
            break
        case activityTypes.ReliefOfAttack:
            img = require('../resources/squareIcons/reliefofattack.png')
            break
        case activityTypes.Headache:
            img = require('../resources/squareIcons/headache.png')
            break
        case activityTypes.HeartAreaPain:
            img = require('../resources/squareIcons/heartareapain.png')
            break
        case activityTypes.RetrosternalPain:
            img = require('../resources/squareIcons/pain.png')
            break
        case activityTypes.Arrhythmia:
            img = require('../resources/squareIcons/arrhythmia.png')
            break
        case activityTypes.Palpitation:
            img = require('../resources/squareIcons/palpitation.png')
            break
        case activityTypes.Dyspnea:
            img = require('../resources/squareIcons/dyspnea.png')
            break
        case activityTypes.Tachypnea:
            img = require('../resources/squareIcons/tachypnea.png')
            break
        case activityTypes.Nausea:
            img = require('../resources/squareIcons/nausea.png')
            break
        case activityTypes.Syncope:
            img = require('../resources/squareIcons/syncope.png')
            break
        case activityTypes.Fatigue:
            img = require('../resources/squareIcons/fatigue.png')
            break
        case activityTypes.Stupefaction:
            img = require('../resources/squareIcons/weakness.png')
            break
        case activityTypes.VisionDisturbances:
            img = require('../resources/squareIcons/vision.png')
            break
        case activityTypes.PositiveEmotions:
            img = require('../resources/squareIcons/positiveemotions.png')
            break
        case activityTypes.Running:
            img = require('../resources/squareIcons/running.png')
            break
        case activityTypes.NormalWalking:
            img = require('../resources/squareIcons/walking.png')
            break
        case activityTypes.Bicycling:
            img = require('../resources/squareIcons/bicycle.png')
            break
        case activityTypes.NegativeEmotions:
            img = require('../resources/squareIcons/negativeemotions.png')
            break
        case activityTypes.Sex:
            img = require('../resources/squareIcons/sex.png')
            break
        case activityTypes.Alarm:
            img = require('../resources/squareIcons/alarm.png')
            break
        case activityTypes.Toilet:
            img = require('../resources/squareIcons/toilet.png')
            break
        case activityTypes.ActiveOrthostasis:
            img = require('../resources/squareIcons/orthostasis.png')
            break
        case activityTypes.TakingMedicine:
            img = require('../resources/squareIcons/pills.png')
            break
        case activityTypes.PhysicalLoad:
            img = require('../resources/squareIcons/physicalload.png')
            break
        case activityTypes.Pain:
            img = require('../resources/squareIcons/pain.png')
            break
        case activityTypes.Complaints:
            img = require('../resources/squareIcons/complaints.png')
            break
        case activityTypes.Weakness:
            img = require('../resources/squareIcons/weakness.png')
            break
        case activityTypes.EmotionalStress:
            img = require('../resources/squareIcons/emotionalstress.png')
            break
        case activityTypes.Tests:
            img = require('../resources/squareIcons/tests.png')
            break
        case activityTypes.Straining:
            img = require('../resources/squareIcons/straining.png')
            break
        case activityTypes.MedicineTest:
            img = require('../resources/squareIcons/pills.png')
            break
        case activityTypes.PsychoemotionalTest:
            img = require('../resources/squareIcons/psychoemotionaltest.png')
            break
        case activityTypes.Press:
            img = require('../resources/squareIcons/press.png')
            break
        case activityTypes.CuffFix:
            img = require('../resources/squareIcons/cufffix.png')
            break
        case activityTypes.ElectrodeReplacement:
            img = require('../resources/squareIcons/electrodereplacement.png')
            break
        case activityTypes.DeviceInstall:
            img = require('../resources/squareIcons/device.png')
            break
        case activityTypes.VerticalPositionCalibration:
            img = require('../resources/squareIcons/calibration.png')
            break
        case activityTypes.DeepBreathing:
            img = require('../resources/squareIcons/deepbreathing.png')
            break
        case activityTypes.Workout:
            img = require('../resources/squareIcons/workout.png')
            break
        default:
            img = require('../resources/squareIcons/unknown.png')
            break
    }

    return img
}
