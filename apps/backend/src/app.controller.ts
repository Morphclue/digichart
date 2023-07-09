import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {Digimon} from '@digichart/types';
import {AppService} from './app.service';
import {DigimonDto} from './dto/digimon.dto';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getAllDigimon(): Promise<Digimon[]> {
    return this.appService.getAllDigimon();
  }

  @Get(':name')
  getTreeById(@Param('name') name: string) {
    return this.appService.getTreeById(name);
  }

  @Post()
  addDigimon(@Body() digimonDto: DigimonDto) {
    return this.appService.addDigimon(digimonDto);
  }
}
