import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

@Module({
    imports: [PrismaModule],
    controllers: [ShippingController],
    providers: [JwtService, ShippingService]
})
export class ShippingModule {}