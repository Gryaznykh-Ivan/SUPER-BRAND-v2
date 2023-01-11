import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
    imports: [PrismaModule],
    controllers: [FilesController],
    providers: [JwtService, FilesService]
})
export class FilesModule {}