import { Module } from '@nestjs/common';
import { ApiV1Module } from './v1/api.module';
import { AdminModule } from './admin/admin.module';


@Module({
    imports: [
        ApiV1Module,
        AdminModule,
    ],
})
export class CoreModule { }