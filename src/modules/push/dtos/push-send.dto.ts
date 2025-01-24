import { IsNotEmpty, IsString } from 'class-validator';

export class PushSendDTO {
  @IsString({ message: 'токен должен быть строкой' })
  @IsNotEmpty({ message: 'токен не должен быть пустой' })
  token: string;
  @IsString({ message: 'тайтл должен быть строкой' })
  title?: string;
  @IsString({ message: 'боди должен быть строкой' })
  body?: string;
}
