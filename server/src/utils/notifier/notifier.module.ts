import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path'

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: "smtp.mail.ru",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.SMTP_EMAIL,
                        pass: process.env.SMTP_PASSWORD,
                    },
                },
                defaults: {
                    from: process.env.SMTP_EMAIL,
                },
                template: {
                    dir: join(__dirname, '../../../mail'),
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