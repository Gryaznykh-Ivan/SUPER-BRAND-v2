import { Module } from '@nestjs/common';
import { PageModule } from './pages/page.module';

@Module({
    imports: [
        PageModule,
    ],
})
export class ApiModule { }