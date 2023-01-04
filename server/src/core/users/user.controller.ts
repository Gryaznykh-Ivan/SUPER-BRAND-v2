import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('search')
    getUsersBySearch(
        @Query('q') q: string,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    ) {
        return this.userService.getUsersBySearch(q, limit, skip)
    }

    @Get(':userId')
    getUserById(
        @Param('userId') userId: string
    ) {
        return this.userService.getUserById(userId)
    }

    @Post('create')
    @HttpCode(200)
    createUser(
        @Body() data: CreateUserDto
    ) {
        return this.userService.createUser(data)
    }

    @Put(':userId')
    updateUser(
        @Param('userId') userId: string,
        @Body() data: UpdateUserDto
    ) {
        return this.userService.updateUser(userId, data)
    }

    @Delete(':userId')
    deleteUser(
        @Param('userId') id: string
    ) {
        return this.userService.deleteUser(id)
    }
}