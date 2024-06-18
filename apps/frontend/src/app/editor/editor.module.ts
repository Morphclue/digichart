import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

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
    CoreModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class EditorModule {
}
