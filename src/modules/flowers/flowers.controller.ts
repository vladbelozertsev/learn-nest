import * as Nest from '@nestjs/common';
import { FlowerAddDTO } from './dtos/flower-add.dto';
import { FlowersService } from './flowers.service';
import { MyGuard } from './guards/my-guard';
import { MyInterceptor } from './interceptors/my-interceptor';
import { MyPipe } from './pipes/my-pipe';

@Nest.Controller('flowers')
@Nest.UseInterceptors(MyInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Nest.Get('')
  @Nest.UseGuards(MyGuard)
  getAll(@Nest.Query('pageNumber', MyPipe) pageNumber: number) {
    console.log(pageNumber);
    return this.flowersService.getAll();
  }

  @Nest.Post()
  @Nest.UseGuards(MyGuard)
  // @Nest.UsePipes(new Nest.ValidationPipe()) // dto Validation // moved to main.ts
  create(@Nest.Body() dto: FlowerAddDTO) {
    console.log(dto);
    return this.flowersService.create(dto);
  }
}
