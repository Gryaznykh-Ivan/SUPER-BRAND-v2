import { Module } from '@nestjs/common';
import { ProxyModule } from '../proxy/proxy.module';
import { BrowserService } from './browser.service';

@Module({
    imports: [ProxyModule],
    providers: [BrowserService],
    exports: [BrowserService]
})
export class BrowserModule {}