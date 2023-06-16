import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Types} from 'mongoose';

@Schema()
export class Digimon {
  @Prop({unique: true})
  name: string;

  @Prop()
  level: string;

  @Prop()
  img: string;

  // TODO: use mean-stream/nestx to create a reference to Digimon
  @Prop({type: [{type: Types.ObjectId, ref: 'Digimon'}]})
  evolvesTo: Types.ObjectId[];
}

export const DigimonSchema = SchemaFactory.createForClass(Digimon);
