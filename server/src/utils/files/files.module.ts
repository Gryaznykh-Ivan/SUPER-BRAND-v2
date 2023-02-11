import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesService } from './files.service';

@Module({
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule {}