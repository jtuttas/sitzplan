"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var app_1 = require("../app");
var Mailer = /** @class */ (function () {
    function Mailer(server) {
        this.transporter = nodemailer.createTransport({
            host: app_1.secrets.smtp_server,
            port: app_1.secrets.smtp_port,
            secure: false,
            auth: {
                user: app_1.secrets.smtp_user,
                pass: app_1.secrets.smtp_password // generated ethereal password
            }
        });
        // setup email data with unicode symbols
        this.mailOptions = {
            from: 'tuttas@mmbbs.de',
            to: 'tuttas@mmbbs.de',
            subject: 'Your Registration',
            html: '<b>Bitte bestätigen Sie ihre EMail indem Sie auf diesen <a href="[[link]]">Link</a> klicken!</b>' // html body
        };
        console.log("Set Server to " + server);
        this.server = server;
    }
    Mailer.prototype.sendMail = function (to, uuid) {
        console.log("Start mail transfer...");
        this.mailOptions.to = to;
        this.mailOptions.html = this.mailOptions.html.replace("[[link]]", this.server + "/web/index2.html?uuid=" + uuid);
        // send mail with defined transport object
        this.transporter.sendMail(this.mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    };
    return Mailer;
}());
exports.Mailer = Mailer;
//# sourceMappingURL=mailer.js.map