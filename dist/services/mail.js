"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class Mail {
    constructor(to, subject, message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    sendMail() {
        let mailOptions = {
            from: "admin@zazzybr.com.br",
            to: this.to,
            subject: this.subject,
            html: this.message
        };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'admin@zazzybr.com.br',
                pass: 'zazzy#2018'
            }
        });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return error;
            }
            else {
                console.log(info);
                return "Email enviado com sucesso";
            }
        });
    }
}
exports.default = new Mail;
