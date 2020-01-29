import * as nodemailer from 'nodemailer';

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }

    sendMail() {        

        let mailOptions = {
            from: "admin@zazzybr.com.br",
            to: this.to,
            subject: this.subject,
            html: this.message
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'admin@zazzybr.com.br',
                pass: 'zazzy#2018'
            }
        })

        transporter.sendMail(mailOptions, (error, info) => {
            
            if(error) {
                console.log(error);
                
                return error;
            } else{
                console.log(info);
                
                return "Email enviado com sucesso";
            }
        })
    }
}
export default new Mail;