import { IsString } from 'class-validator';

export class FlowersCreatedDto {
  @IsString({ message: 'текст ошибки' })
  name: string;
  @IsString()
  color: string;
  @IsString()
  price: number;
}

export type TFlowersUpdateDto = Partial<FlowersCreatedDto>;
