import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        CoreModule
    ],
})
export class AppModule { }
