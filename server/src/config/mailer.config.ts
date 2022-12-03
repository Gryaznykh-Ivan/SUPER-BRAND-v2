import { MailerOptions } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const MailerConfig = (): MailerOptions => ({
    transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    },
    defaults: {
        from: '"No Reply" <no-reply@superbrand.com>',
    },
    template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
            strict: true,
        },
    }
});