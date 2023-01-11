import { Controller, DefaultValuePipe, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
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
}