import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { GlobalValidationPipe } from './pipes/global.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new GlobalValidationPipe())
    app.use(compression())

    await app.listen(3003);
}

bootstrap();
