import { Module } from '@nestjs/common';
import { CollectionModule } from './collections/collection.module';
import { PageModule } from './pages/page.module';

@Module({
    imports: [
        PageModule,
        CollectionModule,
    ],
})
export class ApiV1Module { }