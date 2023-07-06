import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Digimon {
  @Prop({unique: true})
  name: string;

  @Prop()
  href: string;

  @Prop()
  priorEvolutions: string[];

  @Prop()
  nextEvolutions: string[];
}

export const DigimonSchema = SchemaFactory.createForClass(Digimon);
