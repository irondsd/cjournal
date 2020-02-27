import { activityTypes } from '../constants'

export function iconPicker(activity_type) {
    let img

    switch (activity_type) {
        case activityTypes.Sleep:
            img = require('../resources/icons/sleep.png')
            break
        case activityTypes.Stairs:
            img = require('../resources/icons/stairs.png')
            break
        case activityTypes.Walking:
            img = require('../resources/icons/walking.png')
            break
        case activityTypes.Gym:
            img = require('../resources/icons/workout.png')
            break
        case activityTypes.Sauna:
            img = require('../resources/icons/sauna.png')
            break
        case activityTypes.Sauna:
            img = require('../resources/icons/sex.png')
            break
        case activityTypes.Shower:
            img = require('../resources/icons/shower.png')
            break
        case activityTypes.Gambling:
            img = require('../resources/icons/gambling.png')
            break
        case activityTypes.IntellectualWork:
            img = require('../resources/icons/brain.png')
            break
        case activityTypes.OtherLoad:
            img = require('../resources/icons/person.png')
            break
        case activityTypes.OtherActivity:
            img = require('../resources/icons/person.png')
            break
        case activityTypes.OtherEmotions:
            img = require('../resources/icons/mood.png')
            break
        case activityTypes.OtherPain:
            img = require('../resources/icons/person.png')
            break
        case activityTypes.OtherComplaints:
            img = require('../resources/icons/person.png')
            break
        case activityTypes.OtherWeakness:
            img = require('../resources/icons/person.png')
            break
        case activityTypes.Service:
            img = require('../resources/icons/service.png')
            break
        case activityTypes.Reading:
            img = require('../resources/icons/reading.png')
            break
        case activityTypes.Relaxation:
            img = require('../resources/icons/tv.png')
            break
        case activityTypes.Viewing:
            img = require('../resources/icons/viewing.png')
            break
        case activityTypes.Massage:
            img = require('../resources/icons/massage.png')
            break
        case activityTypes.Physiotherapy:
            img = require('../resources/icons/physiotherapy.png')
            break
        case activityTypes.Sunbathe:
            img = require('../resources/icons/sunbathe.png')
            break
        case activityTypes.Meal:
            img = require('../resources/icons/meal.png')
            break
        case activityTypes.Alcohol:
            img = require('../resources/icons/alcohol.png')
            break
        case activityTypes.Smoking:
            img = require('../resources/icons/smoking.png')
            break
        case activityTypes.CourseTherapy:
            img = require('../resources/icons/pill.png')
            break
        case activityTypes.ReliefOfAttack:
            img = require('../resources/icons/pill.png')
            break
        case activityTypes.Headache:
            img = require('../resources/icons/sad.png')
            break
        case activityTypes.HeartAreaPain:
            img = require('../resources/icons/pain.png')
            break
        case activityTypes.RetrosternalPain:
            img = require('../resources/icons/pain.png')
            break
        case activityTypes.Arrhythmia:
            img = require('../resources/icons/arrhythmia.png')
            break
        case activityTypes.Palpitation:
            img = require('../resources/icons/heartpain.png')
            break
        case activityTypes.Dyspnea:
            img = require('../resources/icons/lungs.png')
            break
        case activityTypes.Tachypnea:
            img = require('../resources/icons/lungs.png')
            break
        case activityTypes.Faint:
            img = require('../resources/icons/dizzy.png')
            break
        case activityTypes.Syncope:
            img = require('../resources/icons/dizzy.png')
            break
        case activityTypes.Fatigue:
            img = require('../resources/icons/fatigue.png')
            break
        case activityTypes.Nausea:
            img = require('../resources/icons/dizzy.png')
            break
        case activityTypes.Stupefaction:
            img = require('../resources/icons/dizzy.png')
            break
        case activityTypes.VisionDisturbances:
            img = require('../resources/icons/vision.png')
            break
        case activityTypes.Anger:
            img = require('../resources/icons/quarrel.png')
            break
        case activityTypes.Anxiety:
            img = require('../resources/icons/anxiety.png')
            break
        case activityTypes.Excitement:
            img = require('../resources/icons/excitement.png')
            break
        case activityTypes.Fear:
            img = require('../resources/icons/fear.png')
            break
        case activityTypes.Positive:
            img = require('../resources/icons/happy.png')
            break
        case activityTypes.Running:
            img = require('../resources/icons/running.png')
            break
        case activityTypes.GymWalking:
            img = require('../resources/icons/walking.png')
            break
        case activityTypes.Bicycling:
            img = require('../resources/icons/bicycle.png')
            break
        case activityTypes.Negative:
            img = require('../resources/icons/bad.png')
            break
        case activityTypes.Sex:
            img = require('../resources/icons/sex.png')
            break
        case activityTypes.Alarm:
            img = require('../resources/icons/trouble.png')
            break
        case activityTypes.Toilet:
            img = require('../resources/icons/toilet.png')
            break
        case activityTypes.Orthostasis:
            img = require('../resources/icons/laying.png')
            break
        case activityTypes.TakingMedicine:
            img = require('../resources/icons/pill.png')
            break
        case activityTypes.Influence:
            img = require('../resources/icons/influence.png')
            break
        case activityTypes.PhysicalLoad:
            img = require('../resources/icons/physical.png')
            break
        case activityTypes.Pain:
            img = require('../resources/icons/pain.png')
            break
        case activityTypes.Complaints:
            img = require('../resources/icons/heartpain.png')
            break
        case activityTypes.Weakness:
            img = require('../resources/icons/dizzy.png')
            break
        case activityTypes.Emotions:
            img = require('../resources/icons/mood.png')
            break
        case activityTypes.Tests:
            img = require('../resources/icons/tests.png')
            break
        case activityTypes.MedicineTest:
            img = require('../resources/icons/pill.png')
            break
        case activityTypes.Psychotherapy:
            img = require('../resources/icons/psychological.png')
            break
        case activityTypes.DeviceInstall:
            img = require('../resources/icons/device.png')
            break
        default:
            img = require('../resources/icons/activity.png')
            break
    }

    return img
}
