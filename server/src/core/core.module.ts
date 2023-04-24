import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AdminModule } from './admin/admin.module';


@Module({
    imports: [
        ApiModule,
        AdminModule,
    ],
})
export class CoreModule { }