import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<string, boolean | undefined> {
    transform(value?: string): (boolean | undefined) {
        if (value === undefined) {
            return undefined
        }
        
        if (value.toLowerCase() === "true") {
            return true
        }

        return false
    }
}