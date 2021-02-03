export const identityServerConfig = {
    issuer: 'https://identity.incart.ru/',
    clientId: 'com.cjournal',
    redirectUrl: 'com.cjournal://oauth',
    scopes: [
        'openid',
        'profile',
        'email',
        'roles',
        'departments',
        'display_name',
        'offline_access',
    ],
}
