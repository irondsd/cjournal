import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { activityTypes, imgSize } from '../constants'
import PropTypes from 'prop-types'
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

class ActivityIcon extends Component {
    render() {
        switch (this.props.icon) {
            case activityTypes.Sleep:
                return (
                    <Sleep
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Stairs:
                return (
                    <Stairs
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Walking:
                return (
                    <Walking
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Trainer:
                return (
                    <Trainer
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Shower:
                return (
                    <Shower
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.OtherLoad:
                return (
                    <PhysicalLoad
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.OtherActivity:
                return (
                    <Activity
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.OtherEmotions:
                return (
                    <OtherEmotions
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.OtherPain:
                return (
                    <OtherPain
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.OtherComplaints:
                return (
                    <Complaints
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.OtherWeakness:
                return (
                    <NegativeEmotions
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Activity:
                return (
                    <Activity
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Service:
                return (
                    <Service
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Meal:
                return (
                    <Meal
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Alcohol:
                return (
                    <Alcohol
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Smoking:
                return (
                    <Smoking
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.CourseTherapy:
                return (
                    <CourseTherapy
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.ReliefOfAttack:
                return (
                    <ReliefOfAttack
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Headache:
                return (
                    <Headache
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.HeartAreaPain:
                return (
                    <HeartAreaPain
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.RetrosternalPain:
                return (
                    <Pain
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Arrhythmia:
                return (
                    <Arrhythmia
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Palpitation:
                return (
                    <Palpitation
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Dyspnea:
                return (
                    <Dyspnea
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Tachypnea:
                return (
                    <Tachypnea
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Nausea:
                return (
                    <Nausea
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Syncope:
                return (
                    <Syncope
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Fatigue:
                return (
                    <Fatigue
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Stupefaction:
                return (
                    <Weakness
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.VisionDisturbances:
                return (
                    <VisionDisturbances
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.PositiveEmotions:
                return (
                    <PositiveEmotions
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Running:
                return (
                    <Running
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.WalkingTest:
                return (
                    <WalkingTest
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Bicycling:
                return (
                    <Bicycle
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.NegativeEmotions:
                return (
                    <NegativeEmotions
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Sex:
                return (
                    <Sex
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Alarm:
                return (
                    <Alarm
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Toilet:
                return (
                    <Toilet
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.ActiveOrthostasis:
                return (
                    <ActiveOrthostasis
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.TakingMedicine:
                return (
                    <Pills
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.PhysicalLoad:
                return (
                    <PhysicalLoad
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Pain:
                return (
                    <Pain
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Complaints:
                return (
                    <Complaints
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Weakness:
                return (
                    <Weakness
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.EmotionalStress:
                return (
                    <EmotionalStress
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Tests:
                return (
                    <Tests
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Straining:
                return (
                    <Straining
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.MedicineTest:
                return (
                    <Pills
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.PsychoemotionalTest:
                return (
                    <PsychoemotionalTest
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Press:
                return (
                    <Press
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.CuffFix:
                return (
                    <CuffFix
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.ElectrodeReplacement:
                return (
                    <ElectrodeReplacement
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.DeviceInstall:
                return (
                    <DeviceInstall
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.VerticalPositionCalibration:
                return (
                    <VerticalPositionCalibration
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.DeepBreathing:
                return (
                    <DeepBreathing
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            case activityTypes.Workout:
                return (
                    <Workout
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
            default:
                return (
                    <Unknown
                        width={this.props.size}
                        height={this.props.size}
                        fill={this.props.fill}
                    />
                )
        }
    }
}

ActivityIcon.propTypes = {
    fill: PropTypes.string,
    size: PropTypes.number,
}

ActivityIcon.defaultProps = {
    fill: '#000',
    size: 100,
}

export default ActivityIcon
