import { activity_types } from '../properties'

export function iconPicker(activity_type) {
    let img

    switch (activity_type) {
        case activity_types.Sleep:
            img = require('../resources/icons/sleep.png')
            break
        case activity_types.Stairs:
            img = require('../resources/icons/stairs.png')
            break
        case activity_types.Walking:
            img = require('../resources/icons/walking.png')
            break
        case activity_types.Workout:
            img = require('../resources/icons/workout.png')
            break
        case activity_types.PhysicalWork:
            img = require('../resources/icons/exercise.png')
            break
        case activity_types.Sauna:
            img = require('../resources/icons/sauna.png')
            break
        case activity_types.Sauna:
            img = require('../resources/icons/sex.png')
            break
        case activity_types.Shower:
            img = require('../resources/icons/shower.png')
            break
        case activity_types.Gambling:
            img = require('../resources/icons/gambling.png')
            break
        case activity_types.IntellectualWork:
            img = require('../resources/icons/brain.png')
            break
        case activity_types.Service:
            img = require('../resources/icons/service.png')
            break
        case activity_types.Reading:
            img = require('../resources/icons/reading.png')
            break
        case activity_types.Relaxation:
            img = require('../resources/icons/tv.png')
            break
        case activity_types.Viewing:
            img = require('../resources/icons/viewing.png')
            break
        case activity_types.Massage:
            img = require('../resources/icons/massage.png')
            break
        case activity_types.Physiotherapy:
            img = require('../resources/icons/physiotherapy.png')
            break
        case activity_types.Sunbathe:
            img = require('../resources/icons/sunbathe.png')
            break
        case activity_types.Meal:
            img = require('../resources/icons/meal.png')
            break
        case activity_types.Alcohol:
            img = require('../resources/icons/alcohol.png')
            break
        case activity_types.Smoking:
            img = require('../resources/icons/smoking.png')
            break
        case activity_types.CourseTherapy:
            img = require('../resources/icons/pill.png')
            break
        case activity_types.ReliefOfAttack:
            img = require('../resources/icons/pill.png')
            break
        case activity_types.AnginousPain:
            img = require('../resources/icons/pain.png')
            break
        case activity_types.HeartAreaPain:
            img = require('../resources/icons/pain.png')
            break
        case activity_types.RetrosternalPain:
            img = require('../resources/icons/pain.png')
            break
        case activity_types.Arrhythmia:
            img = require('../resources/icons/arrhythmia.png')
            break
        case activity_types.Palpitation:
            img = require('../resources/icons/heartpain.png')
            break
        case activity_types.Dyspnea:
            img = require('../resources/icons/lungs.png')
            break
        case activity_types.Tachypnea:
            img = require('../resources/icons/lungs.png')
            break
        case activity_types.Faint:
            img = require('../resources/icons/dizzy.png')
            break
        case activity_types.Fatigue:
            img = require('../resources/icons/fatigue.png')
            break
        case activity_types.Nausea:
            img = require('../resources/icons/dizzy.png')
            break
        case activity_types.Stupefaction:
            img = require('../resources/icons/dizzy.png')
            break
        case activity_types.VisionDisturbances:
            img = require('../resources/icons/vision.png')
            break
        case activity_types.Anger:
            img = require('../resources/icons/quarrel.png')
            break
        case activity_types.Anxiety:
            img = require('../resources/icons/anxiety.png')
            break
        case activity_types.Excitement:
            img = require('../resources/icons/excitement.png')
            break
        case activity_types.Intake:
            img = require('../resources/icons/meal.png')
            break
        case activity_types.Fear:
            img = require('../resources/icons/fear.png')
            break
        case activity_types.Happy:
            img = require('../resources/icons/happy.png')
            break
        case activity_types.Running:
            img = require('../resources/icons/running.png')
            break
        case activity_types.WorkoutWalking:
            img = require('../resources/icons/walking.png')
            break
        case activity_types.Bicycling:
            img = require('../resources/icons/bicycle.png')
            break
        case activity_types.Sadness:
            img = require('../resources/icons/sad.png')
            break
        case activity_types.Sex:
            img = require('../resources/icons/sex.png')
            break
        case activity_types.Alarm:
            img = require('../resources/icons/trouble.png')
            break
        case activity_types.Toilet:
            img = require('../resources/icons/toilet.png')
            break
        case activity_types.Orthostasis:
            img = require('../resources/icons/laying.png')
            break
        case activity_types.TakingMedicine:
            img = require('../resources/icons/pill.png')
            break
        case activity_types.Influence:
            img = require('../resources/icons/influence.png')
            break
        case activity_types.PhysicalActivity:
            img = require('../resources/icons/physical.png')
            break
        case activity_types.ChestPain:
            img = require('../resources/icons/pain.png')
            break
        case activity_types.DisturbanceOfRespiration:
            img = require('../resources/icons/lungs.png')
            break
        case activity_types.CardiacRhythmDisturbance:
            img = require('../resources/icons/heartpain.png')
            break
        case activity_types.Weakness:
            img = require('../resources/icons/dizzy.png')
            break
        case activity_types.Emotions:
            img = require('../resources/icons/mood.png')
            break
        case activity_types.Tests:
            img = require('../resources/icons/tests.png')
            break
        case activity_types.MedicineTest:
            img = require('../resources/icons/pill.png')
            break
        case activity_types.Psychotherapy:
            img = require('../resources/icons/psychological.png')
            break
        case activity_types.DeviceInstall:
            img = require('../resources/icons/device.png')
            break
        default:
            img = require('../resources/icons/activity.png')
            break
    }

    return img
}
