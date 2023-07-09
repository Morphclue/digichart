import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {environment} from './environment';
import {DigimonSchema} from '@digichart/types';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo.uri),
    MongooseModule.forFeature([{name: 'Digimon', schema: DigimonSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
