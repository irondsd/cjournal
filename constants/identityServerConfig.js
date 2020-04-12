export const identityServerConfig = {
    issuer: 'http://identity.incart.ru:7050/',
    clientId: 'com.cjournal',
    redirectUrl: 'com.cjournal://oauth',
    dangerouslyAllowInsecureHttpRequests: true,
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
