import {Digimon} from '@digichart/types';
import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {DigimonDto} from './dto/digimon.dto';

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
    const visited: Set<number> = new Set<number>();
    const queue: QueueNode[] = [];
    const edgeId: number = 421337;
    visited.add(root.id);
    queue.push({id: root.id, parentX: 0, parentY: 0});

    while (queue.length > 0) {
      const q = queue.shift();
      const current = digimonList.find(digimon => digimon.id === q.id);
      if (!current) {
        this.logger.warn(`Digimon with id ${q} not found`);
        continue;
      }
      // FIXME: correct calculation of x needed
      const x = q.parentX / 2 - current.nextEvolutions.length * 2;
      const y = q.parentY - ySpread;

      nodes.push({id: current.id, label: current.name, href: current.href, x: x, y: y});
      current.nextEvolutions.forEach((nextId: number) => {
        if (!visited.has(nextId)) {
          const next = digimonList.find(digimon => digimon.id === nextId);
          if (next === undefined) {
            this.logger.warn(`Digimon ${nextId} not found`);
            return;
          }
          visited.add(nextId);
          queue.push({id: nextId, parentX: x, parentY: y});
          edges.push({id: edgeId, source: current.id, target: nextId});
        }
      });
    }
    return {nodes: nodes, edges: edges};
  }
}
