/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
module.exports = {
    creds: {
        redirectUrl: 'http://localhost:3000/token',
        clientID: '91397a37-f94c-4a58-b9dc-20bbf497a5f5',
        clientSecret: 'znpdIGAJ885|[xuuYNW82|?',
        identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
        allowHttpForRedirectUrl: true,
        responseType: 'code',
        validateIssuer: false,
        responseMode: 'query',
        scope: ['User.Read', 'Mail.Send', 'Files.ReadWrite']
    }
};
//# sourceMappingURL=config.js.map