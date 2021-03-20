import React from 'react'
import { activityTypes } from '../constants'
import WalkingTest from '../resources/svg/6minwalking.svg'
import ElectrodeReplacement from '../resources/svg/electrodereplacement.svg'
import PhysicalLoad from '../resources/svg/physicalload.svg'
import Straining from '../resources/svg/straining.svg'
import Activity from '../resources/svg/activity.svg'
import EmotionalStress from '../resources/svg/emotionalstress.svg'
import Pills from '../resources/svg/pills.svg'
import Syncope from '../resources/svg/syncope.svg'
import Alarm from '../resources/svg/alarm.svg'
import Fatigue from '../resources/svg/fatigue.svg'
import PositiveEmotions from '../resources/svg/positiveemotions.svg'
import Tachypnea from '../resources/svg/tachypnea.svg'
import Alcohol from '../resources/svg/alcohol.svg'
import Headache from '../resources/svg/headache.svg'
import Press from '../resources/svg/press.svg'
import Tests from '../resources/svg/tests.svg'
import Arrhythmia from '../resources/svg/arrhythmia.svg'
import HeartAreaPain from '../resources/svg/heartareapain.svg'
import PsychoemotionalTest from '../resources/svg/psychoemotionaltest.svg'
import Bicycle from '../resources/svg/bicycle.svg'
import Meal from '../resources/svg/meal.svg'
import ReliefOfAttack from '../resources/svg/reliefofattack.svg'
import Toilet from '../resources/svg/toilet.svg'
import VerticalPositionCalibration from '../resources/svg/calibration.svg'
import Nausea from '../resources/svg/nausea.svg'
import Running from '../resources/svg/running.svg'
import Trainer from '../resources/svg/trainer.svg'
import Complaints from '../resources/svg/complaints.svg'
import NegativeEmotions from '../resources/svg/negativeemotions.svg'
import Service from '../resources/svg/service.svg'
import Unknown from '../resources/svg/unknown.svg'
import CourseTherapy from '../resources/svg/coursetherapy.svg'
import ActiveOrthostasis from '../resources/svg/orthostasis.svg'
import Sex from '../resources/svg/sex.svg'
import VisionDisturbances from '../resources/svg/vision.svg'
import CuffFix from '../resources/svg/cufffix.svg'
import OtherEmotions from '../resources/svg/otheremotions.svg'
import Shower from '../resources/svg/shower.svg'
import Walking from '../resources/svg/walking.svg'
import DeepBreathing from '../resources/svg/deepbreathing.svg'
import OtherPain from '../resources/svg/otherpain.svg'
import Sleep from '../resources/svg/sleep.svg'
import Weakness from '../resources/svg/weakness.svg'
import DeviceInstall from '../resources/svg/device.svg'
import Pain from '../resources/svg/pain.svg'
import Smoking from '../resources/svg/smoking.svg'
import Workout from '../resources/svg/workout.svg'
import Palpitation from '../resources/svg/palpitation.svg'
import Dyspnea from '../resources/svg/dyspnea.svg'
import Stairs from '../resources/svg/stairs.svg'

interface ActivityIconProps {
    icon: string
    fill: string
    size: number
}

const ActivityIcon: React.FC<ActivityIconProps> = ({
    icon,
    fill = '#000000',
    size = 100,
}) => {
    const props = {
        width: size,
        height: size,
        fill,
    }

    switch (icon) {
        case activityTypes.Sleep:
            return <Sleep {...props} />
        case activityTypes.Stairs:
            return <Stairs {...props} />
        case activityTypes.Walking:
            return <Walking {...props} />
        case activityTypes.Trainer:
            return <Trainer {...props} />
        case activityTypes.Shower:
            return <Shower {...props} />
        case activityTypes.OtherLoad:
            return <PhysicalLoad {...props} />
        case activityTypes.OtherActivity:
            return <Activity {...props} />
        case activityTypes.OtherEmotions:
            return <OtherEmotions {...props} />
        case activityTypes.OtherPain:
            return <OtherPain {...props} />
        case activityTypes.OtherComplaints:
            return <Complaints {...props} />
        case activityTypes.OtherWeakness:
            return <NegativeEmotions {...props} />
        case activityTypes.Activity:
            return <Activity {...props} />
        case activityTypes.Service:
            return <Service {...props} />
        case activityTypes.Meal:
            return <Meal {...props} />
        case activityTypes.Alcohol:
            return <Alcohol {...props} />
        case activityTypes.Smoking:
            return <Smoking {...props} />
        case activityTypes.CourseTherapy:
            return <CourseTherapy {...props} />
        case activityTypes.ReliefOfAttack:
            return <ReliefOfAttack {...props} />
        case activityTypes.Headache:
            return <Headache {...props} />
        case activityTypes.HeartAreaPain:
            return <HeartAreaPain {...props} />
        case activityTypes.RetrosternalPain:
            return <Pain {...props} />
        case activityTypes.Arrhythmia:
            return <Arrhythmia {...props} />
        case activityTypes.Palpitation:
            return <Palpitation {...props} />
        case activityTypes.Dyspnea:
            return <Dyspnea {...props} />
        case activityTypes.Tachypnea:
            return <Tachypnea {...props} />
        case activityTypes.Nausea:
            return <Nausea {...props} />
        case activityTypes.Syncope:
            return <Syncope {...props} />
        case activityTypes.Fatigue:
            return <Fatigue {...props} />
        case activityTypes.Stupefaction:
            return <Weakness {...props} />
        case activityTypes.VisionDisturbances:
            return <VisionDisturbances {...props} />
        case activityTypes.PositiveEmotions:
            return <PositiveEmotions {...props} />
        case activityTypes.Running:
            return <Running {...props} />
        case activityTypes.WalkingTest:
            return <WalkingTest {...props} />
        case activityTypes.Bicycling:
            return <Bicycle {...props} />
        case activityTypes.NegativeEmotions:
            return <NegativeEmotions {...props} />
        case activityTypes.Sex:
            return <Sex {...props} />
        case activityTypes.Alarm:
            return <Alarm {...props} />
        case activityTypes.Toilet:
            return <Toilet {...props} />
        case activityTypes.ActiveOrthostasis:
            return <ActiveOrthostasis {...props} />
        case activityTypes.TakingMedicine:
            return <Pills {...props} />
        case activityTypes.PhysicalLoad:
            return <PhysicalLoad {...props} />
        case activityTypes.Pain:
            return <Pain {...props} />
        case activityTypes.Complaints:
            return <Complaints {...props} />
        case activityTypes.Weakness:
            return <Weakness {...props} />
        case activityTypes.EmotionalStress:
            return <EmotionalStress {...props} />
        case activityTypes.Tests:
            return <Tests {...props} />
        case activityTypes.Straining:
            return <Straining {...props} />
        case activityTypes.MedicineTest:
            return <Pills {...props} />
        case activityTypes.PsychoemotionalTest:
            return <PsychoemotionalTest {...props} />
        case activityTypes.Press:
            return <Press {...props} />
        case activityTypes.CuffFix:
            return <CuffFix {...props} />
        case activityTypes.ElectrodeReplacement:
            return <ElectrodeReplacement {...props} />
        case activityTypes.DeviceInstall:
            return <DeviceInstall {...props} />
        case activityTypes.VerticalPositionCalibration:
            return <VerticalPositionCalibration {...props} />
        case activityTypes.DeepBreathing:
            return <DeepBreathing {...props} />
        case activityTypes.Workout:
            return <Workout {...props} />
        default:
            return <Unknown {...props} />
    }
}

export default ActivityIcon
