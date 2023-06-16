import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Digimon} from './schema/digimon.schema';


@Injectable()
export class AppService {

  constructor(
    @InjectModel(Digimon.name) private digimonModel: Model<Digimon>,
  ) {
  }

  async getAllDigimon(): Promise<Digimon[]> {
    return await this.digimonModel.find().exec();
  }
}
