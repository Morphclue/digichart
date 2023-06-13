import {NgModule} from '@angular/core';
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
  ],
})
export class EditorModule {
}
