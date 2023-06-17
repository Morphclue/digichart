import {Body, Controller, Get, Post} from '@nestjs/common';

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

  @Post()
  addDigimon(@Body() digimonDto: DigimonDto) {
    console.log("Request with: " + digimonDto.name);
    return this.appService.addDigimon(digimonDto);
  }
}
