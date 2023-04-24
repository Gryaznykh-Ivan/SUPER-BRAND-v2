import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [PrismaModule],
    controllers: [OrderController],
    providers: [JwtService, OrderService]
})
export class OrderModule { }