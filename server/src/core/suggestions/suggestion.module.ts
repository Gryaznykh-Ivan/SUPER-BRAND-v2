import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';

@Module({
    imports: [PrismaModule],
    controllers: [SuggestionController],
    providers: [SuggestionService],
})
export class SuggestionModule {}