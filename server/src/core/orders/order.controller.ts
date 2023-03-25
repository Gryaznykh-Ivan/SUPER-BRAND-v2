import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateFulfillmentDto, UpdateFulfillmentDto } from './dto/fulfillment.dto';
import { CreateReturnDto, UpdateReturnDto } from './dto/return.dto';
import { SearchOrderDto } from './dto/searchOrder.dto';
import { SearchTimelineDto } from './dto/searchTimeline.dto';
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

    @Get(':orderId/timeline')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_READ])
    getTimelinesBySearch(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Query(new ValidationPipe({ transform: true })) data: SearchTimelineDto
    ) {
        return this.orderService.getTimelinesBySearch(orderId, data)
    }

    @Get(':orderId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_READ])
    getOrderById(
        @Param('orderId', ParseIntPipe) orderId: number
    ) {
        return this.orderService.getOrderById(orderId)
    }

    @Get(':orderId/fulfillment/:fulfillmentId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_READ])
    getFulfillmentById(
        @Param('fulfillmentId') fulfillmentId: string
    ) {
        return this.orderService.getFulfillmentById(fulfillmentId)
    }

    @Get(':orderId/return/:returnId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_READ])
    getReturnById(
        @Param('returnId') returnId: string
    ) {
        return this.orderService.getReturnById(returnId)
    }


    @Post('create')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
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

    @Put(':orderId/confirmPayment')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    confirmPayment(
        @Param('orderId', ParseIntPipe) orderId: number,
        @User() self: IUser
    ) {
        return this.orderService.confirmPayment(orderId, self)
    }

    @Post(':orderId/createFulfillment')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    createFulfillment(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Body() data: CreateFulfillmentDto,
        @User() self: IUser
    ) {
        return this.orderService.createFulfillment(orderId, data, self)
    }

    @Post(':orderId/createReturn')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    createReturn(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Body() data: CreateReturnDto,
        @User() self: IUser
    ) {
        return this.orderService.createReturn(orderId, data, self)
    }

    @Put(':orderId/return/:returnId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    updateReturn(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Param('returnId') returnId: string,
        @Body() data: UpdateReturnDto,
        @User() self: IUser
    ) {
        return this.orderService.updateReturn(orderId, returnId, data, self)
    }

    @Put(':orderId/fulfillment/:fulfillmentId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    updateFulfillment(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Param('fulfillmentId') fulfillmentId: string,
        @Body() data: UpdateFulfillmentDto,
        @User() self: IUser
    ) {
        return this.orderService.updateFulfillment(orderId, fulfillmentId, data, self)
    }

    @Delete(':orderId/fulfillment/:fulfillmentId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    removeFulfillment(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Param('fulfillmentId') fulfillmentId: string,
        @User() self: IUser
    ) {
        return this.orderService.removeFulfillment(orderId, fulfillmentId, self)
    }

    @Delete(':orderId/return/:returnId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.ORDER_UPDATE])
    removeReturn(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Param('returnId') returnId: string,
        @User() self: IUser
    ) {
        return this.orderService.removeReturn(orderId, returnId, self)
    }
}