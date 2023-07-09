import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor/editor.component';
import {NetworkComponent} from './network/network.component';
import {EditorRoutingModule} from './editor-routing.module';

@NgModule({
  declarations: [
    EditorComponent,
    NetworkComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    HttpClientModule,
  ],
})
export class EditorModule {
}
