
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    constructor(private  schema: ZodType) {}
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('from pipe:', value);
   let result =this.schema.safeParse(value);
   if(!result.success){
    throw new BadRequestException({
        message: 'Validation failed',
        cause:{
            extra:result.error.issues
        }
    });
   }
   return value;
  }
}
