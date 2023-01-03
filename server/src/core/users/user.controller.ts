import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AddAddressDto } from './dto/addAddress.dto';
import { AddPermissionDto } from './dto/addPermission.dto';
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

    @Post(':userId/addAddress')
    addAddress(
        @Param('userId') userId: string,
        @Body() data: AddAddressDto
    ) {
        return this.userService.addAddress(userId, data)
    }

    @Delete(':userId/removeAddress/:addressId')
    removeAddress(
        @Param('userId') userId: string,
        @Param('addressId') addressId: string,
    ) {
        return this.userService.removeAddress(userId, addressId)
    }

    @Post(':userId/addPermission')
    addPermission(
        @Param('userId') userId: string,
        @Body() data: AddPermissionDto
    ) {
        return this.userService.addPermission(userId, data)
    }

    @Delete(':userId/removePermission/:permissionId')
    removePermission(
        @Param('userId') userId: string,
        @Param('permissionId') permissionId: string,
    ) {
        return this.userService.removePermission(userId, permissionId)
    }

    @Delete(':userId')
    deleteUser(
        @Param('userId') id: string
    ) {
        return this.userService.deleteUser(id)
    }
}