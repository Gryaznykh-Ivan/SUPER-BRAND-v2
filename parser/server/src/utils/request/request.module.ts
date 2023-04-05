import { Module } from '@nestjs/common';
import { ProxyModule } from '../proxy/proxy.module';
import { RequestService } from './request.service';

@Module({
    imports: [ProxyModule],
    providers: [RequestService],
    exports: [RequestService]
})
export class RequestModule {}