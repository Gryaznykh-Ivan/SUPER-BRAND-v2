import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class NotifierService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendVerificationCode(email: string) {
        try {
            const code = this.getVerificationCode({ length: 4 })

            await this.mailerService.sendMail({
                to: email,
                subject: 'Код подтверждения',
                // text: code,
                // html: `<p>${code}</p>`
                template: "./confirmation",
                context: {
                    code: code
                }
            })
            
            return code
        } catch (e) {
            console.log(e)
            throw new HttpException('Не удалось отправить код подтверждения', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    private getVerificationCode({ length }: { length: number }) {
        return (Math.floor(Math.random() * (10 ** length))).toString().padEnd(length, '0')
    }
}