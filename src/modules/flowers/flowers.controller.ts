import * as Nest from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { MyGuard } from './my-guard';
import { MyInterceptor } from './my-interceptor';
import { MyPipe } from './my-pipe';

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
}
