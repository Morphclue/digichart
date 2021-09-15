import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditorComponent} from './editor/editor.component';
import {TreeComponent} from './tree/tree.component';
import {EditorRoutingModule} from "./editor-routing.module";

@NgModule({
  declarations: [
    EditorComponent,
    TreeComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
  ]
})
export class EditorModule {
}
