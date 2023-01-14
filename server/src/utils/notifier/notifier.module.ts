import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: process.env.SMTP_EMAIL,
                        pass: process.env.SMTP_PASSWORD,
                    },
                },
                defaults: {
                    from: '"No Reply" <no-reply@sb.com>',
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new EjsAdapter(),
                    options: {
                        strict: true,
                    },
                }
            })
        }),
    ],
    providers: [NotifierService],
    exports: [NotifierService]
})
export class NotifierModule { }