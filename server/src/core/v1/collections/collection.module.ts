import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-module/prisma.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
    imports: [PrismaModule],
    controllers: [CollectionController],
    providers: [CollectionService],
})
export class CollectionModule { }