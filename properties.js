// urls
export const backendUrl = 'http://217.197.236.243:3333'
export const apiUrl = `${backendUrl}/api/`
export const identityUrl = `http://identity.incart.ru:7050`
export const registrationUrl = `${identityUrl}/Identity/Account/Register`
export const profileEditUrl = `${identityUrl}/Identity/Account/Manage`
export const identityTokenUrl = `${identityUrl}/connect/token`
export const identityUserInfoUrl = `${identityUrl}/connect/userinfo`

// colors
export const appColor = '#e84d2e'
export const backgroundColor = '#fcfeff'

// list if editable activities
export const editable = [
    'Rest',
    'PhysicalWork',
    'Sex',
    'Toilet',
    'Sauna',
    'Shower',
    'IntellectualWork',
    'Gambling',
    'Viewing',
    'Reading',
    'Psychotherapy',
    'Relaxation',
    'Massage',
    'Physiotherapy',
    'Sunbathe',
    'Meal',
    'Alcohol',
    'Smoking',
    'ReliefOfAttack',
    'CourseTherapy',
    'AnginousPain',
    'RetrosternalPain',
    'HeartAreaPain',
    'Palpitation',
    'Arrhythmia',
    'Dyspnea',
    'Tachypnea',
    'Faint',
    'Stupefaction',
    'Nausea',
    'VisionDisturbances',
    'Fatigue',
    'Joy',
    'Sadness',
    'Anger',
    'Fear',
    'Excitement',
    'Anxiety',
]

// duration in minutes
export const durations = [
    0,
    1,
    5,
    10,
    20,
    30,
    45,
    60,
    120,
    180,
    240,
    300,
    360,
    420,
    480,
    540,
    600,
    720,
]

// for derypting QR
export const secretKey = 'baba_yaga'

// overlapping matrix
export const overlaps = {
    Activity: [
        'Activity',
        'Rest',
        'Stairs',
        'Walking',
        'Workout',
        'PhysicalActivity',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'PsychologicalActivity',
        'IntellectualWork',
        'Gambling',
        'Viewing',
        'Reading',
        'Psychotherapy',
        'Relaxation',
        'Influence',
        'Massage',
        'Physiotherapy',
        'Sunbathe',
        'Intake',
        'Meal',
        'Alcohol',
        'Smoking',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
    PhysicalActivity: [
        'Activity',
        'Rest',
        'Stairs',
        'Walking',
        'Workout',
        'PhysicalActivity',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'PsychologicalActivity',
        'IntellectualWork',
        'Gambling',
        'Viewing',
        'Reading',
        'Psychotherapy',
        'Relaxation',
        'Influence',
        'Massage',
        'Physiotherapy',
        'Sunbathe',
        'Smoking',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
    PsychologicalActivity: [
        'Activity',
        'Rest',
        'Stairs',
        'Walking',
        'Workout',
        'PhysicalActivity',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'PsychologicalActivity',
        'IntellectualWork',
        'Gambling',
        'Viewing',
        'Reading',
        'Psychotherapy',
        'Relaxation',
        'Influence',
        'Massage',
        'Physiotherapy',
        'Sunbathe',
        'Intake',
        'Meal',
        'Alcohol',
        'Smoking',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
    Influence: [
        'Activity',
        'Rest',
        'Stairs',
        'Walking',
        'Workout',
        'PhysicalActivity',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'PsychologicalActivity',
        'IntellectualWork',
        'Gambling',
        'Viewing',
        'Reading',
        'Psychotherapy',
        'Relaxation',
        'Influence',
        'Massage',
        'Physiotherapy',
        'Sunbathe',
        'Intake',
        'Meal',
        'Alcohol',
        'Smoking',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
    Intake: [
        'Activity',
        'Rest',
        'Stairs',
        'Walking',
        'Workout',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
    Tests: [
        'Activity',
        'Rest',
        'Stairs',
        'Walking',
        'Workout',
        'PhysicalActivity',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'PsychologicalActivity',
        'IntellectualWork',
        'Gambling',
        'Viewing',
        'Reading',
        'Psychotherapy',
        'Relaxation',
        'Influence',
        'Massage',
        'Physiotherapy',
        'Sunbathe',
        'Intake',
        'Meal',
        'Alcohol',
        'Smoking',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
}

// complete list of possible activities
export const activity_types = {
    Activity: 'Activity',
    Rest: 'Rest',
    Stairs: 'Stairs',
    Walking: 'Walking',
    Running: 'Running',
    Bicycling: 'Bicycling',
    WorkoutWalking: 'WorkoutWalking',
    Workout: 'Workout',
    PhysicalActivity: 'PhysicalActivity',
    PhysicalWork: 'PhysicalWork',
    Sex: 'Sex',
    Toilet: 'Toilet',
    Sauna: 'Sauna',
    Shower: 'Shower',
    Trouble: 'Trouble',
    PsychologicalActivity: 'PsychologicalActivity',
    IntellectualWork: 'IntellectualWork',
    Gambling: 'Gambling',
    Viewing: 'Viewing',
    Reading: 'Reading',
    Psychotherapy: 'Psychotherapy',
    Relaxation: 'Relaxation',
    Influence: 'Influence',
    Massage: 'Massage',
    Physiotherapy: 'Physiotherapy',
    Sunbathe: 'Sunbathe',
    Intake: 'Intake',
    Meal: 'Meal',
    Alcohol: 'Alcohol',
    Smoking: 'Smoking',
    TakingMedicine: 'TakingMedicine',
    ReliefOfAttack: 'ReliefOfAttack',
    CourseTherapy: 'CourseTherapy',
    ChestPain: 'ChestPain',
    AnginousPain: 'AnginousPain',
    RetrosternalPain: 'RetrosternalPain',
    HeartAreaPain: 'HeartAreaPain',
    CardiacRhythmDisturbance: 'CardiacRhythmDisturbance',
    Palpitation: 'Palpitation',
    Arrhythmia: 'Arrhythmia',
    DisturbanceOfRespiration: 'DisturbanceOfRespiration',
    Dyspnea: 'Dyspnea',
    Tachypnea: 'Tachypnea',
    Weakness: 'Weakness',
    Faint: 'Faint',
    Stupefaction: 'Stupefaction',
    Nausea: 'Nausea',
    VisionDisturbances: 'VisionDisturbances',
    Fatigue: 'Fatigue',
    Emotions: 'Emotions',
    Happy: 'Happy',
    Sadness: 'Sadness',
    Anger: 'Anger',
    Fear: 'Fear',
    Excitement: 'Excitement',
    Anxiety: 'Anxiety',
    Tests: 'Tests',
    Orthostasis: 'Orthostasis',
    PositionalChanges: 'PositionalChanges',
    Press: 'Press',
    Straining: 'Straining',
    MedicineTest: 'MedicineTest',
    DeviceInstall: 'DeviceInstall',
}

// navigation paths
export const paths = {
    Login: 'Login',
    Home: 'Home',
    Jounal: 'Journal',
    ActivityDetails: 'ActivityDetails',
    Tasks: 'Tasks',
    Settings: 'Settings',
    TimePick: 'TimePick',
    ActivityStats: 'ActivityStats',
    Activity: 'Activity',
    PhysicalActivity: 'PhysicalActivity',
    PsychologicalActivity: 'PsychologicalActivity',
    Intake: 'Intake',
    Influence: 'Influence',
    Walking: 'Walking',
    Rest: 'Rest',
    ExerciseFinish: 'ExerciseFinish',
    TakingMedicine: 'TakingMedicine',
    ChestPain: 'ChestPain',
    CardiacRhythmDisturbance: 'CardiacRhythmDisturbance',
    DisturbanceOfRespiration: 'DisturbanceOfRespiration',
    Stairs: 'Stairs',
    Emotions: 'Emotions',
    Weakness: 'Weakness',
    Pills: 'Pills',
    MedicineTest: 'MedicineTest',
    Tests: 'Tests',
    Orthostasis: 'Orthostasis',
    Running: 'Running',
    WorkoutWalking: 'WorkoutWalking',
    Bicycling: 'Bicycling',
    Workout: 'Workout',
    Trouble: 'Trouble',
    DeviceInstall: 'DeviceInstall',
    Camera: 'Camera',
    Welcome: 'Welcome',
}

export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const rec_version = 1
