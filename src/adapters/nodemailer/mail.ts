import { MailAdapter, SendMailData } from "../mail"
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2c1472f2409435",
        pass: "24698d334da10e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        transport.sendMail({
            from: 'Equipe Feedget <email@email.com>',
            to: 'Diegao <gabripampuch@hotmail.com>',
            subject,
            html: body,
        })
    }
}