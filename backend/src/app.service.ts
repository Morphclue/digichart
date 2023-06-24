import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {DigimonDto} from './dto/digimon.dto';
import {Digimon} from './schema/digimon.schema';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(
    @InjectModel(Digimon.name) private digimonModel: Model<Digimon>,
  ) {
  }

  async getAllDigimon(): Promise<Digimon[]> {
    return await this.digimonModel.find().exec();
  }

  async addDigimon(digimon: DigimonDto) {
    return new this.digimonModel(digimon).save();
  }

  async getTreeById(id: number) {
    const rootDigimon = await this.digimonModel.findOne({id: id}).exec();
    const digimonList = await this.digimonModel.find().exec();
    return this.bfs(digimonList, rootDigimon);
  }

  private async bfs(digimonList: Digimon[], root: Digimon) {
    // FIXME: currently broken
    const nodes: VisNode[] = [];
    const edges: VisEdge[] = [];
    const visited: Set<number> = new Set<number>();
    const queue: number[] = [];
    visited.add(root.id);
    queue.push(root.id);

    while (queue.length > 0) {
      const currentId = queue.shift();
      const current = digimonList.find(digimon => digimon.id === currentId);
      if (!current) {
        this.logger.warn(`Digimon with id ${currentId} not found`);
        continue;
      }
      nodes.push({id: current.id, label: current.name, image: current.href});
      current.nextEvolutions.forEach(nextId => {
        if (!visited.has(nextId)) {
          const next = digimonList.find(digimon => digimon.id === nextId);
          if (next.priorEvolutions.includes(currentId)) {
            visited.add(nextId);
            queue.push(nextId);
            edges.push({from: current.id, to: nextId});
          }
        }
      });
    }
    return {nodes: nodes, edges: edges};
  }
}
