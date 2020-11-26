import * as nodemailer from 'nodemailer';
import { secrets } from '../app';

export class Mailer {
    private server:string;

    constructor(server:string) {
        console.log("Set Server to "+server);
        
        this.server=server;
    }

    transporter = nodemailer.createTransport({
        host: secrets.smtp_server,
        port: secrets.smtp_port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: secrets.smtp_user, // generated ethereal user
            pass: secrets.smtp_password // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    mailOptions = {
        from: 'tuttas@mmbbs.de', // sender address
        to: 'tuttas@mmbbs.de', // list of receivers
        subject: 'Your Registration', // Subject line        
        html: '<b>Bitte bestätigen Sie ihre EMail indem Sie auf diesen <a href="[[link]]">Link</a> klicken!</b>' // html body
    };

    sendMail(to: string,uuid:string) {
        console.log("Start mail transfer...");
        
        this.mailOptions.to=to;
        
        this.mailOptions.html= this.mailOptions.html.replace("[[link]]",this.server+"/web/index2.html?uuid="+uuid);
        // send mail with defined transport object
        this.transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}