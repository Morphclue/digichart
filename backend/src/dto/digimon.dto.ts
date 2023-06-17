import {IsNumber, IsString} from 'class-validator';

export class DigimonDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString({each: true})
  levels: string[];

  @IsString()
  href: string;

  @IsNumber({}, {each: true})
  nextEvolutions: number[];
}
