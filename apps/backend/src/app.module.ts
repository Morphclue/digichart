import {DigimonSchema} from '@digichart/types';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {environment} from './environment';

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
