import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.USER_READ])
    getUsersBySearch(
        @Query('q') q: string,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    ) {
        return this.userService.getUsersBySearch(q, limit, skip)
    }

    @Get(':userId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.USER_READ])
    getUserById(
        @Param('userId') userId: string
    ) {
        return this.userService.getUserById(userId)
    }

    @Get(':userId/addresses')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.USER_READ])
    getUserAddresses(
        @Param('userId') userId: string
    ) {
        return this.userService.getUserAddresses(userId)
    }

    @Post('create')
    @HttpCode(200)
    @Auth([Role.ADMIN, Role.MANAGER], [Right.USER_UPDATE])
    createUser(
        @Body() data: CreateUserDto,
        @User() self: IUser
    ) {
        return this.userService.createUser(data, self)
    }

    @Put(':userId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.USER_UPDATE])
    updateUser(
        @Param('userId') userId: string,
        @Body() data: UpdateUserDto,
        @User() self: IUser
    ) {
        return this.userService.updateUser(userId, data, self)
    }

    @Delete(':userId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.USER_UPDATE])
    deleteUser(
        @Param('userId') id: string,
        @User() self: IUser
    ) {
        return this.userService.deleteUser(id, self)
    }
}