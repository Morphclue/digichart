import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {DigimonDto} from './dto/digimon.dto';
import {Digimon} from './schema/digimon.schema';

@Injectable()
export class AppService {
  private logger: Logger = new Logger(AppService.name);

  constructor(
    @InjectModel(Digimon.name) private digimonModel: Model<Digimon>,
  ) {
  }

  async getAllDigimon(): Promise<Digimon[]> {
    return await this.digimonModel.find().exec();
  }

  async addDigimon(digimon: DigimonDto) {
    console.log(`addDigimon: ${digimon.name}`);
    return new this.digimonModel(digimon).save();
  }

  async getTreeById(name: string) {
    const rootDigimon = await this.digimonModel.findOne({name: name}).exec();
    const digimonList = await this.digimonModel.find().exec();
    return this.bfs(digimonList, rootDigimon);
  }

  private async bfs(digimonList: Digimon[], root: Digimon) {
    const nodes: SigmaNode[] = [];
    const edges: SigmaEdge[] = [];
    let edgeId = 4200;
    const visited: Set<string> = new Set<string>();
    const queue: string[] = [];
    visited.add(root.name);
    queue.push(root.name);

    while (queue.length > 0) {
      const currentName = queue.shift();
      const current = digimonList.find(digimon => digimon.name === currentName);
      if (!current) {
        this.logger.warn(`Digimon with id ${currentName} not found`);
        continue;
      }
      nodes.push({id: current.name, label: current.name, href: current.href});
      current.nextEvolutions.forEach((nextName: string) => {
        if (!visited.has(nextName)) {
          const next = digimonList.find(digimon => digimon.name === nextName);
          if(next === undefined) {
            console.log(`Digimon ${nextName} not found`);
            return;
          }
          if (next.priorEvolutions.includes(currentName)) {
            visited.add(nextName);
            queue.push(nextName);
            edges.push({id: edgeId, source: current.name, target: nextName});
          }
        }
      });
    }
    return {nodes: nodes, edges: edges};
  }
}
