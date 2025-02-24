import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { AnyZodObject, SafeParseError } from 'zod'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: AnyZodObject) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value
    }
    const result = this.schema.safeParse(value)
    if (!result.success) {
      const e = result as SafeParseError<AnyZodObject>
      throw new BadRequestException(e.error.format())
    }
    return result.data
  }
}
