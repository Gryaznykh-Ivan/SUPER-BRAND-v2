import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CoreModule } from './core/core.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            serveRoot: "/static",
            rootPath: process.env.STATIC_FILES_PATH
        }),
        CoreModule
    ],
})
export class AppModule { }
