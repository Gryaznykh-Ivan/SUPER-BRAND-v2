import { Module } from '@nestjs/common';
import { ParserDBModule } from 'src/db/parser/parser.module';
import { ProxyService } from './proxy.service';

@Module({
    imports: [ParserDBModule],
    providers: [ProxyService],
    exports: [ProxyService]
})
export class ProxyModule { }