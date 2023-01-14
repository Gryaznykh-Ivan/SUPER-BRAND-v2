import { Module } from '@nestjs/common';
import { UrlService } from './urls.service';

@Module({
    providers: [UrlService],
    exports: [UrlService]
})
export class UrlModule { }