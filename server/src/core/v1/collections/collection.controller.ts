import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { SearchDto } from './dto/search.dto';

@Controller('v1/collections')
export class CollectionController {
    constructor(
        private collectionService: CollectionService
    ) { }

    @Get(':collectionHandle/info')
    getCollectionInfoByHandle(
        @Param('collectionHandle') collectionHandle: string,
    ) {
        return this.collectionService.getCollectionInfoByHandle(collectionHandle)
    }

    @Get(':collectionHandle/products')
    getCollectionProductsByHandle(
        @Param('collectionHandle') collectionHandle: string,
        @Query(new ValidationPipe({ transform: true })) data: SearchDto
    ) {
        return this.collectionService.getCollectionProductsByHandle(collectionHandle, data)
    }
}