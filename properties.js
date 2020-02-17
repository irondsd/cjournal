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
    'Sleep',
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
    'Other Load',
    'Other Activity',
    'Other Emotions',
    'Other Pain',
    'Other Complaints',
    'Other Weakness',
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

// overlapping matrix
export const overlaps = {
    Activity: [
        'Activity',
        'Sleep',
        'Stairs',
        'Walking',
        'Gym',
        'PhysicalLoad',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'Service',
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
    PhysicalLoad: [
        'Activity',
        'Sleep',
        'Stairs',
        'Walking',
        'Gym',
        'PhysicalLoad',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'Service',
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
    Service: [
        'Activity',
        'Sleep',
        'Stairs',
        'Walking',
        'Gym',
        'PhysicalLoad',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'Service',
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
        'Sleep',
        'Stairs',
        'Walking',
        'Gym',
        'PhysicalLoad',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'Service',
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
        'Sleep',
        'Stairs',
        'Walking',
        'Gym',
        'Tests',
        'Orthostasis',
        'MedicineTest',
    ],
    Tests: [
        'Activity',
        'Sleep',
        'Stairs',
        'Walking',
        'Gym',
        'PhysicalLoad',
        'PhysicalWork',
        'Sex',
        'Toilet',
        'Sauna',
        'Shower',
        'Service',
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
    Sleep: 'Sleep',
    Stairs: 'Stairs',
    Walking: 'Walking',
    Running: 'Running',
    Bicycling: 'Bicycling',
    GymWalking: 'GymWalking',
    Gym: 'Gym',
    PhysicalLoad: 'PhysicalLoad',
    PhysicalWork: 'PhysicalWork',
    Sex: 'Sex',
    Toilet: 'Toilet',
    Sauna: 'Sauna',
    Shower: 'Shower',
    Alarm: 'Alarm',
    Service: 'Service',
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
    Pain: 'Pain',
    AnginousPain: 'AnginousPain',
    RetrosternalPain: 'RetrosternalPain',
    HeartAreaPain: 'HeartAreaPain',
    Palpitation: 'Palpitation',
    Arrhythmia: 'Arrhythmia',
    Complaints: 'Complaints',
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
    OtherLoad: 'OtherLoad',
    OtherActivity: 'OtherActivity',
    OtherEmotions: 'OtherEmotions',
    OtherPain: 'OtherPain',
    OtherComplaints: 'OtherComplaints',
    OtherWeakness: 'OtherWeakness',
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
    PhysicalLoad: 'PhysicalLoad',
    Service: 'Service',
    Intake: 'Intake',
    Influence: 'Influence',
    Walking: 'Walking',
    Other: 'Other',
    Sleep: 'Sleep',
    ExerciseFinish: 'ExerciseFinish',
    TakingMedicine: 'TakingMedicine',
    Pain: 'Pain',
    Complaints: 'Complaints',
    Stairs: 'Stairs',
    Emotions: 'Emotions',
    Weakness: 'Weakness',
    Pills: 'Pills',
    MedicineTest: 'MedicineTest',
    Tests: 'Tests',
    Orthostasis: 'Orthostasis',
    Running: 'Running',
    GymWalking: 'GymWalking',
    Bicycling: 'Bicycling',
    Alarm: 'Alarm',
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
