import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { CreateOrderDto } from './dto/createOrder.dto';
import { SearchOrderDto } from './dto/searchOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_READ])
    getOrdersBySearch(
        @Query(new ValidationPipe({ transform: true })) data: SearchOrderDto
    ) {
        return this.orderService.getOrdersBySearch(data)
    }

    @Get(':orderId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_READ])
    getOrderById(
        @Param('orderId', ParseIntPipe) orderId: number
    ) {
        return this.orderService.getOrderById(orderId)
    }


    @Post('create')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_CREATE])
    createOrder(
        @Body() data: CreateOrderDto,
        @User() self: IUser
    ) {
        return this.orderService.createOrder(data, self)
    }

    @Put(':orderId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    updateOrder(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Body() data: UpdateOrderDto,
        @User() self: IUser
    ) {
        return this.orderService.updateOrder(orderId, data, self)
    }
}