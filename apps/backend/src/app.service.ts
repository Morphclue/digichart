import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {DigimonDto} from './dto/digimon.dto';
import {Digimon} from '@digichart/types';

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
    const ySpread = 15;
    const nodes: SigmaNode[] = [];
    const edges: SigmaEdge[] = [];
    const visited: Set<string> = new Set<string>();
    const queue: QueueNode[] = [];
    let edgeId: number = 4200;
    visited.add(root.name);
    queue.push({name: root.name, parentX: 0, parentY: 0});

    while (queue.length > 0) {
      const q = queue.shift();
      const current = digimonList.find(digimon => digimon.name === q.name);
      if (!current) {
        this.logger.warn(`Digimon with id ${q} not found`);
        continue;
      }
      // FIXME: correct calculation of x needed
      const x = q.parentX / 2 - current.nextEvolutions.length * 2;
      const y = q.parentY - ySpread;

      nodes.push({id: current.name, label: current.name, href: current.href, x: x, y: y});
      current.nextEvolutions.forEach((nextName: string) => {
        if (!visited.has(nextName)) {
          const next = digimonList.find(digimon => digimon.name === nextName);
          if (next === undefined) {
            this.logger.warn(`Digimon ${nextName} not found`);
            return;
          }
          visited.add(nextName);
          queue.push({name: nextName, parentX: x, parentY: y});
          edges.push({id: edgeId, source: current.name, target: nextName});
        }
      });
    }
    return {nodes: nodes, edges: edges};
  }
}
