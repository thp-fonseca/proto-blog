import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common'
import { AnyZodObject, SafeParseError, ZodError } from 'zod'

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
      throw new ZodError(e.error.errors)
    }
    return result.data
  }
}
