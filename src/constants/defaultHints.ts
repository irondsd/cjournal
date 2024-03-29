import { strings } from '../localization'

export const defaultHints: { [index: string]: string[] } = {
    OtherActivity: [],
    OtherComplaints: [],
    OtherLoad: [strings.WeightLifting, strings.PhysicalLabor],
    OtherPain: [],
    OtherWeakness: [],
    OtherEmotions: [
        strings.Joy,
        strings.Sadness,
        strings.Anger,
        strings.Fear,
        strings.Excitement,
        strings.Anxiety,
    ],
    VerticalPositionCalibration: [
        strings.Straight,
        strings.LeaningForward,
        strings.LeaningToTheRight,
    ],
    Trainer: [
        strings.TrainerWalk,
        strings.TrainerRun,
        strings.Cycling,
        strings.Elliptical,
        strings.StairStepper,
    ],
}
