import React from 'react'
import { ActivityTypes } from '../constants'
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
        case ActivityTypes.Sleep:
            return <Sleep {...props} />
        case ActivityTypes.Stairs:
            return <Stairs {...props} />
        case ActivityTypes.Walking:
            return <Walking {...props} />
        case ActivityTypes.Trainer:
            return <Trainer {...props} />
        case ActivityTypes.Shower:
            return <Shower {...props} />
        case ActivityTypes.OtherLoad:
            return <PhysicalLoad {...props} />
        case ActivityTypes.OtherActivity:
            return <Activity {...props} />
        case ActivityTypes.OtherEmotions:
            return <OtherEmotions {...props} />
        case ActivityTypes.OtherPain:
            return <OtherPain {...props} />
        case ActivityTypes.OtherComplaints:
            return <Complaints {...props} />
        case ActivityTypes.OtherWeakness:
            return <NegativeEmotions {...props} />
        case ActivityTypes.Activity:
            return <Activity {...props} />
        case ActivityTypes.Service:
            return <Service {...props} />
        case ActivityTypes.Meal:
            return <Meal {...props} />
        case ActivityTypes.Alcohol:
            return <Alcohol {...props} />
        case ActivityTypes.Smoking:
            return <Smoking {...props} />
        case ActivityTypes.CourseTherapy:
            return <CourseTherapy {...props} />
        case ActivityTypes.ReliefOfAttack:
            return <ReliefOfAttack {...props} />
        case ActivityTypes.Headache:
            return <Headache {...props} />
        case ActivityTypes.HeartAreaPain:
            return <HeartAreaPain {...props} />
        case ActivityTypes.RetrosternalPain:
            return <Pain {...props} />
        case ActivityTypes.Arrhythmia:
            return <Arrhythmia {...props} />
        case ActivityTypes.Palpitation:
            return <Palpitation {...props} />
        case ActivityTypes.Dyspnea:
            return <Dyspnea {...props} />
        case ActivityTypes.Tachypnea:
            return <Tachypnea {...props} />
        case ActivityTypes.Nausea:
            return <Nausea {...props} />
        case ActivityTypes.Syncope:
            return <Syncope {...props} />
        case ActivityTypes.Fatigue:
            return <Fatigue {...props} />
        case ActivityTypes.Stupefaction:
            return <Weakness {...props} />
        case ActivityTypes.VisionDisturbances:
            return <VisionDisturbances {...props} />
        case ActivityTypes.PositiveEmotions:
            return <PositiveEmotions {...props} />
        case ActivityTypes.Running:
            return <Running {...props} />
        case ActivityTypes.WalkingTest:
            return <WalkingTest {...props} />
        case ActivityTypes.Bicycling:
            return <Bicycle {...props} />
        case ActivityTypes.NegativeEmotions:
            return <NegativeEmotions {...props} />
        case ActivityTypes.Sex:
            return <Sex {...props} />
        case ActivityTypes.Alarm:
            return <Alarm {...props} />
        case ActivityTypes.Toilet:
            return <Toilet {...props} />
        case ActivityTypes.ActiveOrthostasis:
            return <ActiveOrthostasis {...props} />
        case ActivityTypes.TakingMedicine:
            return <Pills {...props} />
        case ActivityTypes.PhysicalLoad:
            return <PhysicalLoad {...props} />
        case ActivityTypes.Pain:
            return <Pain {...props} />
        case ActivityTypes.Complaints:
            return <Complaints {...props} />
        case ActivityTypes.Weakness:
            return <Weakness {...props} />
        case ActivityTypes.EmotionalStress:
            return <EmotionalStress {...props} />
        case ActivityTypes.Tests:
            return <Tests {...props} />
        case ActivityTypes.Straining:
            return <Straining {...props} />
        case ActivityTypes.MedicineTest:
            return <Pills {...props} />
        case ActivityTypes.PsychoemotionalTest:
            return <PsychoemotionalTest {...props} />
        case ActivityTypes.Press:
            return <Press {...props} />
        case ActivityTypes.CuffFix:
            return <CuffFix {...props} />
        case ActivityTypes.ElectrodeReplacement:
            return <ElectrodeReplacement {...props} />
        case ActivityTypes.DeviceInstall:
            return <DeviceInstall {...props} />
        case ActivityTypes.VerticalPositionCalibration:
            return <VerticalPositionCalibration {...props} />
        case ActivityTypes.DeepBreathing:
            return <DeepBreathing {...props} />
        case ActivityTypes.Workout:
            return <Workout {...props} />
        default:
            return <Unknown {...props} />
    }
}

export default ActivityIcon
