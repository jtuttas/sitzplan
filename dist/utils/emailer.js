/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
// The contents of the outbound email message that will be sent to the user
var emailContent = "<html><head> <meta http-equiv='Content-Type' content='text/html; charset=us-ascii'> <title></title> </head>\n  <body style='font-family:calibri'> <p>Congratulations {{name}}!</p> <p>This is a message from the Microsoft Graph Connect Sample. \n  You are well on your way to incorporating Microsoft Graph endpoints in your apps.</p><a href='{{sharingLink}}'>See the photo you just uploaded!</a> \n  <h3>What&#8217;s next?</h3> <ul><li>Check out <a href='https://developer.microsoft.com/graph/' target='_blank'>developer.microsoft.com/graph</a> \n  to start building Microsoft Graph apps today with all the latest tools, templates, and guidance to get started quickly.</li><li>Use the \n  <a href='https://developer.microsoft.com/graph/graph-explorer' target='_blank'>Graph Explorer</a> to explore the rest of the APIs and start your \n  testing.</li><li>Browse other <a href='https://github.com/search?q=org%3Amicrosoftgraph+-sample' target='_blank'>samples on GitHub</a> to see \n  more of the APIs in action.</li></ul> <h3>Give us feedback</h3> <p>If you have any trouble running this sample, please \n  <a href='https://github.com/microsoftgraph/nodejs-connect-rest-sample/issues' target='_blank'>log an issue</a>.\n  </p><p>For general questions about the Microsoft Graph API, post to <a href='https://stackoverflow.com/questions/tagged/microsoftgraph' \n  target='blank'>Stack Overflow</a>. Make sure that your questions or comments are tagged with [microsoftgraph].</p><p>Thanks and happy \n  coding!<br>Your Microsoft Graph samples development team </p> <div style='text-align:center; font-family:calibri'> <table style='width:100%; \n  font-family:calibri'> <tbody> <tr> <td><a href='https://github.com/microsoftgraph/nodejs-connect-rest-sample'>See on GitHub</a> </td> <td>\n  <a href='https://officespdev.uservoice.com'>Suggest on UserVoice</a> </td> <td><a href='https://twitter.com/share?text=I%20just%20started%20developing%20apps%20for%20%23NodeJS%20using%20the%20%23MicrosoftGraph%20Connect%20app%20%40OfficeDev&amp;url=https://github.com/microsoftgraph/nodejs-connect-rest-sample'>\n  Share on Twitter</a> </td> </tr> </tbody> </table> </div>  </body> </html>";
/**
 * Returns the outbound email message content with the supplied name populated in the text.
 * @param {string} name The proper noun to use when addressing the email.
 * @param {string} sharingLink The sharing link to the file to embed in the email.
 * @return {string} the formatted email body
 */
function getEmailContent(name, sharingLink) {
    var bodyContent = emailContent.replace('{{name}}', name);
    bodyContent = bodyContent.replace('{{sharingLink}}', sharingLink);
    return bodyContent;
}
/**
 * Wraps the email's message content in the expected [soon-to-deserialized JSON] format.
 * @param {string} content The message body of the email message.
 * @param {string} recipient The email address to whom this message will be sent.
 * @return the message object to send over the wire
 */
function wrapEmail(content, recipient, file) {
    var attachments = [{
            '@odata.type': '#microsoft.graph.fileAttachment',
            ContentBytes: file,
            Name: 'mypic.jpg'
        }];
    var emailAsPayload = {
        Message: {
            Subject: 'Welcome to Microsoft Graph development with Node.js and the Microsoft Graph Connect sample',
            Body: {
                ContentType: 'HTML',
                Content: content
            },
            ToRecipients: [
                {
                    EmailAddress: {
                        Address: recipient
                    }
                }
            ]
        },
        SaveToSentItems: true,
        Attachments: attachments
    };
    return emailAsPayload;
}
/**
 * Delegating method to wrap the formatted email message into a POST-able object
 * @param {string} name the name used to address the recipient
 * @param {string} recipient the email address to which the connect email will be sent
 */
function generateMailBody(name, recipient, sharingLink, file) {
    return wrapEmail(getEmailContent(name, sharingLink), recipient, file);
}
exports.generateMailBody = generateMailBody;
//# sourceMappingURL=emailer.js.map