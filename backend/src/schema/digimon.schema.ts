import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Digimon {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  levels: string[];

  @Prop()
  href: string;

  @Prop()
  priorEvolutions: number[];

  @Prop()
  nextEvolutions: number[];
}

export const DigimonSchema = SchemaFactory.createForClass(Digimon);
