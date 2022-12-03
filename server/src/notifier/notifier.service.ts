import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class NotifierService {
    constructor(
        private readonly mailerService: MailerService
    ) { }


    async sendVerificationCode(email: string) {
        try {
            const code = (Math.floor(Math.random() * 1000000)).toString().padEnd(6, '0')

            await this.mailerService
                .sendMail({
                    to: email,
                    subject: 'Код подтверждения ✔',
                    text: code,
                    html: `<p>${code}</p>`
                })

            return code
        } catch (e) {
            console.log(e)
            throw new HttpException('Не удалось отправить код подтверждения', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}