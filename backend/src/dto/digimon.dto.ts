import {IsString} from 'class-validator';

export class DigimonDto {
  @IsString()
  name: string;

  @IsString()
  href: string;

  @IsString({each: true})
  priorEvolutions: string[];

  @IsString({each: true})
  nextEvolutions: string[];
}
