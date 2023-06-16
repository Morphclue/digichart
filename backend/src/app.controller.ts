import {Controller, Get} from '@nestjs/common';

import {AppService} from './app.service';
import {Digimon} from './schema/digimon.schema';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getAllDigimon(): Promise<Digimon[]> {
    return this.appService.getAllDigimon();
  }
}
