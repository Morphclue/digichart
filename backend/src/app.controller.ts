import {BadRequestException, Body, Controller, Get, Param, Post} from '@nestjs/common';

import {AppService} from './app.service';
import {DigimonDto} from './dto/digimon.dto';
import {Digimon} from './schema/digimon.schema';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getAllDigimon(): Promise<Digimon[]> {
    return this.appService.getAllDigimon();
  }

  @Get(':id')
  getTreeById(@Param('id') id: number) {
    return this.appService.getTreeById(id);
  }

  @Post()
  addDigimon(@Body() digimonDto: DigimonDto) {
    return this.appService.addDigimon(digimonDto);
  }
}
