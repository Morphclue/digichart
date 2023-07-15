import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {CoreModule} from '../core/core.module';
import {EditorComponent} from './editor/editor.component';
import {EditorRoutingModule} from './editor-routing.module';
import {NetworkComponent} from './network/network.component';

@NgModule({
  declarations: [
    EditorComponent,
    NetworkComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
})
export class EditorModule {
}
