import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from 'src/config/mailer.config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: MailerConfig
        }),
    ],
    providers: [NotifierService],
    exports: [NotifierService]
})
export class NotifierModule { }