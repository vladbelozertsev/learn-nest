import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MyPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    console.log('MY_PIPE');
    const valueToInt = parseInt(value, 10);
    if (isNaN(valueToInt)) throw new BadRequestException('ParseInt failed');
    return valueToInt;
  }
}
