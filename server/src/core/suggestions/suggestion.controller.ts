import { Controller, DefaultValuePipe, Get, Param, ParseArrayPipe, Query, ValidationPipe } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SuggestionService } from './suggestion.service';

@Controller('suggestions')
export class SuggestionController {
    constructor(
        private readonly suggestionService: SuggestionService
    ) { }

    @Get('countries')
    countries(
        @Query('q') q: string
    ) {
        return this.suggestionService.countries(q)
    }

    @Get('regions')
    regions(
        @Query('q') q: string,
        @Query('country') country?: string
    ) {
        return this.suggestionService.regions(q, country)
    }

    @Get('cities')
    cities(
        @Query('q') q: string,
        @Query('region') region?: string
    ) {
        return this.suggestionService.cities(q, region)
    }

    @Get('deliveryZones')
    deliveryZones(
        @Query('profileId') profileId: string,
        @Query(new ValidationPipe({ transform: true })) data: SearchDto,
    ) {
        return this.suggestionService.deliveryZones(profileId, data)
    }

    @Get('collections')
    collections(
        @Query('q') q: string,
        @Query('ids', new DefaultValuePipe([]), ParseArrayPipe) ids: string[]
    ) {
        return this.suggestionService.collections(q, ids)
    }

    @Get('vendors')
    vendors(
        @Query('q') q: string,
    ) {
        return this.suggestionService.vendors(q)
    }

    @Get('productTypes')
    productTypes(
        @Query('q') q: string,
    ) {
        return this.suggestionService.productTypes(q)
    }

    @Get('deliveryProfiles')
    deliveryProfiles() {
        return this.suggestionService.deliveryProfiles()
    }

    @Get('deliveryOptions')
    deliveryOptions(
        @Query('deliveryProfileId') deliveryProfileId: string,
        @Query('region') region: string
    ) {
        return this.suggestionService.deliveryOptions(deliveryProfileId, region)
    }
}