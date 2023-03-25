
import { Module } from '@nestjs/common';
import { ParserDBService } from './parser.service';

@Module({
  providers: [ParserDBService],
  exports: [ParserDBService],
})
export class ParserDBModule {}