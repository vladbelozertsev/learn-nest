import { IsNumber, IsString } from 'class-validator';

export class FlowerAddDTO {
  @IsString({ message: 'текст ошибки' })
  name: string;

  @IsString({ message: 'текст ошибки2' })
  color: string;

  @IsNumber()
  price: number;
}
