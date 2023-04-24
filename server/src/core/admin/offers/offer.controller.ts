import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { Token } from 'src/decorators/token.decorator';
import { CreateOfferDto } from './dto/createOffer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { OfferService } from './offer.service';
import { ParseBooleanPipe } from 'src/pipes/parse-boolean.pipe';
import { SearchOfferDto } from './dto/searchOffer.dto';

@Controller('admin/offers')
export class OfferController {

    constructor(
        private readonly offerService: OfferService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.COLLECTION_READ])
    getOffersBySearch(
        @Query(new ValidationPipe({ transform: true })) data: SearchOfferDto,
    ) {
        return this.offerService.getOffersBySearch(data)
    }

    @Get(':offerId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.COLLECTION_READ])
    getOfferById(
        @Param('offerId') offerId: string
    ) {
        return this.offerService.getOfferById(offerId)
    }


    @Post('create')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.COLLECTION_UPDATE])
    createOffer(
        @Body() data: CreateOfferDto
    ) {
        return this.offerService.createOffer(data)
    }

    @Put(':offerId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.COLLECTION_UPDATE])
    updateOffer(
        @Param('offerId') offerId: string,
        @Body() data: UpdateOfferDto
    ) {
        return this.offerService.updateOffer(offerId, data)
    }

    @Delete(':offerId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.COLLECTION_UPDATE])
    removeOffer(
        @Param('offerId') offerId: string,
    ) {
        return this.offerService.removeOffer(offerId)
    }
}