import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';

@Module({
    exports: [UploadService],
    providers: [UploadService],
})
export class UploadModule { }