import {CommonModule} from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {EditorComponent} from './editor/editor.component';
import {EditorRoutingModule} from './editor-routing.module';
import {NetworkComponent} from './network/network.component';
import {CoreModule} from '../core/core.module';

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
