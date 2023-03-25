import { Module } from '@nestjs/common';
import { ProxyModule } from '../proxy/proxy.module';
import { PuppetterService } from './puppetter.service';

@Module({
    imports: [ProxyModule],
    providers: [PuppetterService],
    exports: [PuppetterService]
})
export class PuppetterModule {}